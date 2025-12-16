'use client';

import { useEffect, useMemo, useState } from 'react';
import { getTestimonials, type Testimonial } from '@/lib/testimonials';
import localStore from '@/lib/localStore';
import './additional-styles.css';

import AddTestimonialModal from './AddTestimonialModal';
import TestimonialCard from './TestimonialCard';

export default function TestimonialsPage() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [base, setBase] = useState<Testimonial[]>([]);
  const [stored, setStored] = useState<Testimonial[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  // load mock/base testimonials (async) once on client
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getTestimonials();
        if (alive) setBase(Array.isArray(data) ? data : []);
      } catch {
        if (alive) setBase([]);
      }
    })();
    return () => { alive = false; };
  }, []);

  // read localStorage/IDB only AFTER hydration
  useEffect(() => {
    setStored(localStore.loadAll());
    setHiddenIds(localStore.loadHidden());
    setHydrated(true);
  }, []);

  // simple, robust filter
  const hiddenSet = useMemo(() => new Set(hiddenIds), [hiddenIds]);

  const items = useMemo(() => {
    const merged = [...stored, ...base].filter(t => !hiddenSet.has(t.id));
    const term = q.trim().toLowerCase();
    if (!term) return merged;
    return merged.filter(t => {
      const bag = [
        t.name,
        t.short,
        t.exam,
        t.subject,
        t.program,
        String(t.year ?? ''),
        String(t.rank ?? ''),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return bag.includes(term);
    });
  }, [q, base, stored, hiddenSet]);

  const onAdded = () => {
    setStored(localStore.loadAll());
  };

  const storedIdSet = useMemo(() => new Set(stored.map(t => t.id)), [stored]);

  useEffect(() => {
    setSelectedIds(ids => ids.filter(id => storedIdSet.has(id)));
  }, [storedIdSet]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const cancelSelectMode = () => {
    setSelectMode(false);
    setSelectedIds([]);
  };

  const confirmDelete = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm(`Delete ${selectedIds.length} testimonial${selectedIds.length > 1 ? 's' : ''}?`)) return;
    const storedRecords = stored.filter(t => selectedIds.includes(t.id));
    const storedIdsToRemove = storedRecords.map(t => t.id);
    const baseIdsToHide = selectedIds.filter(id => !storedIdsToRemove.includes(id));

    if (storedRecords.length) {
      const remaining = await localStore.removeTestimonials(storedRecords);
      setStored(remaining);
    }

    if (baseIdsToHide.length) {
      const nextHidden = Array.from(new Set([...hiddenIds, ...baseIdsToHide]));
      localStore.saveHidden(nextHidden);
      setHiddenIds(nextHidden);
    }

    cancelSelectMode();
  };

  const buildMediaBuckets = (list: Testimonial[]) => {
    const buckets = { videos: [] as Testimonial[], images: [] as Testimonial[], texts: [] as Testimonial[] };
    list.forEach((t) => {
      if (t.video && (t.video.type === 'embed' || t.video.type === 'file')) {
        buckets.videos.push(t);
      } else if (t.image) {
        buckets.images.push(t);
      } else {
        buckets.texts.push(t);
      }
    });
    return buckets;
  };

  const categorizeJeeResult = (t: Testimonial): 'mains' | 'advanced' => {
    if (t.jeeTier) return t.jeeTier;
    if (t.exam !== 'JEE') return 'advanced';
    const blob = [t.short, t.program, t.text]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    if (blob.includes('main') || blob.includes('mains')) return 'mains';
    return 'advanced';
  };

  const jeeBuckets = useMemo(() => {
    if (!hydrated) {
      return {
        mains: { videos: [], images: [], texts: [] },
        advanced: { videos: [], images: [], texts: [] },
      };
    }

    const mainsItems: Testimonial[] = [];
    const advancedItems: Testimonial[] = [];

    items.forEach((t) => {
      const bucket = categorizeJeeResult(t) === 'advanced' ? advancedItems : mainsItems;
      bucket.push(t);
    });

    return {
      mains: buildMediaBuckets(mainsItems),
      advanced: buildMediaBuckets(advancedItems),
    };
  }, [items, hydrated]);

  const renderMediaSections = (label: string, data: ReturnType<typeof buildMediaBuckets>) => {
    const { videos, images, texts } = data;
    const empty = videos.length === 0 && images.length === 0 && texts.length === 0;

    return (
      <section className="t-result-block">
        <div className="t-result-header">
          <h3 className="t-result-title">{label}</h3>
          {empty && <p className="t-empty">No records yet.</p>}
        </div>

        {videos.length > 0 && (
          <section className="t-sect">
            <h4 className="t-row-title">Videos</h4>
            <div className="t-row-grid t-row-grid--4">
              {videos.map((t) => (
                <TestimonialCard
                  key={t.id}
                  t={t}
                  selectable={selectMode}
                  selected={selectedIds.includes(t.id)}
                  onToggleSelect={toggleSelect}
                />
              ))}
            </div>
          </section>
        )}

        {images.length > 0 && (
          <section className="t-sect">
            <h4 className="t-row-title">Images</h4>
            <div className="t-row-grid t-row-grid--4">
              {images.map((t) => (
                <TestimonialCard
                  key={t.id}
                  t={t}
                  selectable={selectMode}
                  selected={selectedIds.includes(t.id)}
                  onToggleSelect={toggleSelect}
                />
              ))}
            </div>
          </section>
        )}

        {texts.length > 0 && (
          <section className="t-sect">
            <h4 className="t-row-title">Text</h4>
            <div className="t-row-grid t-row-grid--4">
              {texts.map((t) => (
                <TestimonialCard
                  key={t.id}
                  t={t}
                  selectable={selectMode}
                  selected={selectedIds.includes(t.id)}
                  onToggleSelect={toggleSelect}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    );
  };

  return (
    <section className="t-wrap">
      <header className="t-header">
        <h2 className="t-title">Student Testimonials</h2>
        <p className="t-subtitle">Add image/video/text below — stored locally in “folders”.</p>
        <div className="t-controls">
          <input
            className="t-input"
            placeholder="Search by name, rank, exam, year..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="t-button" onClick={() => setOpen(true)}>+ Add Testimonial</button>
          {!selectMode && stored.length > 0 && (
            <button className="t-button t-button--ghost" onClick={() => setSelectMode(true)}>
              Delete Testimonials
            </button>
          )}
          {selectMode && (
            <>
              <button
                className="t-button"
                onClick={confirmDelete}
                disabled={!selectedIds.length}
              >
                Delete Selected ({selectedIds.length})
              </button>
              <button className="t-button t-button--ghost" onClick={cancelSelectMode}>
                Cancel
              </button>
            </>
          )}
        </div>
      </header>

      {renderMediaSections('JEE Mains Results', jeeBuckets.mains)}
      {renderMediaSections('JEE Advanced Results', jeeBuckets.advanced)}

      {open && <AddTestimonialModal onCancel={() => setOpen(false)} onAdded={onAdded} />}
    </section>
  );
}

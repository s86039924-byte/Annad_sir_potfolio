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
    setHydrated(true);
  }, []);

  // simple, robust filter
  const items = useMemo(() => {
    const merged = [...stored, ...base];
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
  }, [q, base, stored]);

  const onAdded = (t: Testimonial) => {
    // list recomputes from localStore via useMemo
  };

  // Group by media type for aligned rows
  const [videos, images, texts] = useMemo(() => {
    const list = hydrated ? items : ([] as Testimonial[]);
    const vids = list.filter(t => t.video && (t.video.type === 'embed' || t.video.type === 'file'));
    const imgs = list.filter(t => !vids.includes(t) && t.image);
    const txts = list.filter(t => !vids.includes(t) && !imgs.includes(t));
    return [vids, imgs, txts];
  }, [items, hydrated]);

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
        </div>
      </header>

      {/* Videos row(s): 4 per row, wrap to next line */}
      {videos.length > 0 && (
        <section className="t-sect">
          <h3 className="t-row-title">Videos</h3>
          <div className="t-row-grid t-row-grid--4">
            {videos.map((t) => <TestimonialCard key={t.id} t={t} />)}
          </div>
        </section>
      )}

      {/* Images row(s): 4 per row */}
      {images.length > 0 && (
        <section className="t-sect">
          <h3 className="t-row-title">Images</h3>
          <div className="t-row-grid t-row-grid--4">
            {images.map((t) => <TestimonialCard key={t.id} t={t} />)}
          </div>
        </section>
      )}

      {/* Text-only row(s): 4 per row */}
      {texts.length > 0 && (
        <section className="t-sect">
          <h3 className="t-row-title">Text</h3>
          <div className="t-row-grid t-row-grid--4">
            {texts.map((t) => <TestimonialCard key={t.id} t={t} />)}
          </div>
        </section>
      )}

      {open && <AddTestimonialModal onCancel={() => setOpen(false)} onAdded={onAdded} />}
    </section>
  );
}


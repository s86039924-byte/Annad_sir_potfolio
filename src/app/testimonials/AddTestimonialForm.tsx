'use client';

import React, { useMemo, useState, useRef } from 'react';
import { exams, subjects, mediaKinds, type Exam, type Subject, type MediaKind, type Testimonial, type JeeTier } from '@/lib/testimonials';
import localStore, { genId, dbPut } from '@/lib/localStore';
import { classifyUrl, getYouTubeId, drivePreviewUrl, driveImageUrl, driveThumbnailUrl } from '@/lib/embed';

export default function AddTestimonialForm({
  onAdded,
  onCancel,
}: {
  onAdded?: (t: Testimonial) => void;
  onCancel?: () => void;
}) {
  const [kind, setKind] = useState<MediaKind>('image');
  const [name, setName] = useState('');
  const [short, setShort] = useState('');
  const [exam, setExam] = useState<Exam>('JEE');
  const [subject, setSubject] = useState<Subject>('General');
  const [jeeTier, setJeeTier] = useState<JeeTier>('mains');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [program, setProgram] = useState('');
  const [badgeLabel, setBadgeLabel] = useState('All India Rank');
  const [badgeValue, setBadgeValue] = useState('');
  const [text, setText] = useState('');
  const [stars, setStars] = useState(5);

  const [videoUrl, setVideoUrl] = useState(''); // YouTube or Drive
  const [imageUrl, setImageUrl] = useState<string>(''); // NEW: remote image link (Drive/direct)
  const [imagePreview, setImagePreview] = useState<string>();
  const [thumbPreview, setThumbPreview] = useState<string>();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const imgInput = useRef<HTMLInputElement>(null);
  const thumbInput = useRef<HTMLInputElement>(null);
  const vidInput = useRef<HTMLInputElement>(null);

  const ytThumb = useMemo(() => {
    const id = getYouTubeId(videoUrl);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;
  }, [videoUrl]);

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(await localStore.fileToDataUrl(f));
  }

  async function onPickThumb(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setThumbPreview(await localStore.fileToDataUrl(f));
  }

  function onPickVideoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setVideoFile(f);
  }

  function reset() {
    setKind('image'); setName(''); setShort(''); setExam('JEE'); setSubject('General'); setJeeTier('mains');
    setYear(new Date().getFullYear()); setProgram(''); setBadgeValue('');
    setText(''); setStars(5); setVideoUrl(''); setImageUrl(''); setImagePreview(undefined);
    setThumbPreview(undefined); setImageFile(null); setVideoFile(null);
    if (imgInput.current) imgInput.current.value = '';
    if (thumbInput.current) thumbInput.current.value = '';
    if (vidInput.current) vidInput.current.value = '';
  }

  async function save() {
    if (!name.trim()) return alert('Name is required');
    if (!short.trim()) return alert('Highlight (e.g., AIR 16) is required');

    const id = genId();
    const base: Testimonial = {
      id, name: name.trim(), short: short.trim(),
      exam, subject, year, kind, program: program.trim() || undefined, stars,
      jeeTier: exam === 'JEE' ? jeeTier : undefined,
      badge: badgeValue ? { label: badgeLabel || undefined, value: badgeValue } : undefined,
    };

    if (kind === 'video') {
      if (!videoUrl) return alert('Provide a video URL');
      const c = classifyUrl(videoUrl);
      if (c.kind === 'youtube' && c.id) {
        base.video = { type: 'embed', provider: 'youtube', src: `https://www.youtube.com/embed/${c.id}` };
      } else if (c.kind === 'drive' && c.id) {
        base.video = {
          type: 'embed',
          provider: 'drive',
          src: drivePreviewUrl(c.id),
          poster: driveThumbnailUrl(c.id, 1200),
        };
      } else {
        // Fallback: treat as a direct file URL (browser will attempt to play)
        base.video = { type: 'file', provider: 'direct', src: videoUrl };
      }
    }

    if (kind === 'image') {
      if (imageUrl) {
        const raw = imageUrl.trim();
        const c = classifyUrl(raw);
        let finalUrl = raw;
        if (c.kind === 'drive' && c.id) {
          // turn share link into a direct view URL
          finalUrl = driveImageUrl(c.id);
        }
        base.image = { url: finalUrl, provider: c.kind || 'direct', alt: `${name} ${short}` };
      } else {
        if (!imageFile) return alert('Provide an image URL or upload a file');
        await dbPut('images', id, imageFile, imageFile.type);
        const dataUrl = imagePreview || await localStore.fileToDataUrl(imageFile);
        localStore.saveImageData(id, dataUrl);
        base.image = { id, dataUrl, blobId: id, alt: `${name} ${short}` };
      }
    }

    if (kind === 'text') {
      if (!text.trim()) return alert('Write the testimonial text');
      base.text = text.trim();
    }

    const all = localStore.loadAll();
    all.unshift(base);
    localStore.saveAll(all);
    onAdded?.(base);
    onCancel?.();
    reset();
  }

  return (
    <form className="atm-form" onSubmit={(e) => { e.preventDefault(); save(); }}>
      {/* Media type (small) */}
      <div className="col-3">
        <label>Media Type</label>
        <select value={kind} onChange={e => setKind(e.target.value as MediaKind)}>
          {mediaKinds.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      {/* Name (wide) */}
      <div className="col-9">
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Student name" />
      </div>

      {/* Highlight (very wide) */}
      <div className="col-12">
        <label>Highlight</label>
        <input type="text" value={short} onChange={e => setShort(e.target.value)} placeholder="e.g., AIR 16 / 99.87%ile" />
      </div>

      {/* Program (wide, optional) */}
      <div className="col-12">
        <label>Program (optional)</label>
        <input type="text" value={program} onChange={e => setProgram(e.target.value)} placeholder="Four Year Classroom Program" />
      </div>

      {/* Exam / Subject (medium) */}
      <div className="col-3">
        <label>Exam</label>
        <select value={exam} onChange={e => setExam(e.target.value as Exam)}>
          {exams.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </div>
      {exam === 'JEE' && (
        <div className="col-3">
          <label>JEE Result Type</label>
          <select value={jeeTier} onChange={e => setJeeTier(e.target.value as JeeTier)}>
            <option value="mains">JEE Main Result</option>
            <option value="advanced">JEE Advanced Result</option>
          </select>
        </div>
      )}
      <div className="col-3">
        <label>Subject</label>
        <select value={subject} onChange={e => setSubject(e.target.value as Subject)}>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Year (small) / Stars (small) */}
      <div className="col-3">
        <label>Year</label>
        <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} />
      </div>
      <div className="col-3">
        <label>Stars</label>
        <input type="number" min={0} max={5} value={stars} onChange={e => setStars(Number(e.target.value))} />
      </div>

      {/* Badge (label needs more than value) */}
      <div className="col-9">
        <label>Badge Label</label>
        <input type="text" value={badgeLabel} onChange={e => setBadgeLabel(e.target.value)} placeholder="All India Rank" />
      </div>
      <div className="col-3">
        <label>Badge Value</label>
        <input type="text" value={badgeValue} onChange={e => setBadgeValue(e.target.value)} placeholder="16" />
      </div>

      {/* ==== MEDIA INPUTS ==== */}
      {kind === 'video' && (
        <div className="col-12">
          <label>Video URL (YouTube or Google Drive)</label>
          <input
            type="url"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value.trim())}
            placeholder="https://youtu.be/… or https://drive.google.com/file/d/ID/view"
          />
        </div>
      )}

      {kind === 'image' && (
        <>
          <div className="col-12">
            <label>Image URL (Google Drive or direct)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value.trim())}
              placeholder="https://drive.google.com/file/d/ID/view or https://…/image.jpg"
            />
          </div>
          <div className="col-12">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
          </div>
        </>
      )}

      {kind === 'text' && (
        <div className="col-12">
          <label>Text</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Student feedback..." />
        </div>
      )}

      <div className="atm-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save to Local</button>
      </div>
    </form>
  );
}




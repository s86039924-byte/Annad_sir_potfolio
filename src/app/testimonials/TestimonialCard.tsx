'use client';

import { useEffect, useMemo, useState } from 'react'
import { type Testimonial } from '@/lib/testimonials'
import localStore, { dbGet } from '@/lib/localStore'
import { driveId, driveProxy } from '@/lib/drive'

type Props = {
  t: Testimonial
  featured?: boolean
  selectable?: boolean
  selected?: boolean
  onToggleSelect?: (id: string) => void
}

export default function TestimonialCard({
  t,
  featured = false,
  selectable = false,
  selected = false,
  onToggleSelect,
}: Props) {
   const [poster, setPoster] = useState<string | undefined>(undefined);
   const isVideoFile = t.video?.type === 'file';
  const badgeText = (() => {
    // Prefer explicit rank
    if (t.rank !== undefined && t.rank !== null && String(t.rank).trim() !== '') {
      return `AIR ${t.rank}`;
    }
    // Then fallback to the new nested badge object
    if ((t as any).badge?.value) {
      const b: any = (t as any).badge;
      return `${b.label ? `${b.label} ` : ''}${b.value}`.trim();
    }
    return null;
  })();

   useEffect(() => {
     let clean = false;
     (async () => {
       if (isVideoFile) {
         const existing = localStore.readVideoThumb(t.id);
         if (!clean && existing) setPoster(existing);
         if (!existing && t.video?.posterDataUrl) setPoster(t.video.posterDataUrl);
         if (!existing && t.video?.poster) setPoster(t.video.poster);
       }
     })();
     return () => { clean = true; };
   }, [t, isVideoFile]);

  const media = useMemo(() => {
    if (t.video?.type === 'file') {
      const blobUrl = `/api/blob/videos/${t.video.src}`;
      return (
        <div className="t-media">
          <video src={blobUrl} poster={poster} controls />
        </div>
      );
    }
    // Drive/YouTube embeds
    if (t.video?.type === 'embed' && t.video?.src) {
      return (
        <div className="t-media">
          <iframe
            src={t.video.src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
          {badgeText && <div className="t-badge">{badgeText}</div>}
        </div>
      );
    }

    // IMAGE: prefer inline dataUrl
    if (t.image?.dataUrl) {
      return (
        <div className="t-media">
          <img src={t.image.dataUrl} alt={t.name} />
          {badgeText && <div className="t-badge">{badgeText}</div>}
        </div>
      );
    }
    const imgAny = (t as any).image || {};
    if (imgAny.url) {
      // Auto-convert Drive share links to view URL, and fallback to thumbnail if needed
      return (
        <div className="t-media">
          <img
            src={driveProxy(t.image?.url || '')}
            alt={t.name}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const id = driveId((e.currentTarget as HTMLImageElement).src) || driveId(imgAny.url);
              if (id) (e.currentTarget as HTMLImageElement).src = driveProxy(id);
            }}
          />
          {badgeText && <div className="t-badge">{badgeText}</div>}
        </div>
      );
    }
    const imgKey = imgAny.blobId || imgAny.id;
    if (imgKey) {
      const imgUrl = `/api/blob/images/${imgKey}`;
      return (
        <div className="t-media">
          <img src={imgUrl} alt={t.name} />
        </div>
      );
    }
    // no media → text-only card
    return null;
  }, [t, poster]);

   return (
     <article className={`t-card ${featured ? 't-card--featured' : ''} ${media ? '' : 't-card--text'}`}>
       {selectable && (
         <button
           type="button"
           className={`t-card-select ${selected ? 't-card-select--active' : ''}`}
           aria-pressed={selected}
           onClick={() => onToggleSelect?.(t.id)}
         >
           {selected ? '✓' : ''}
         </button>
       )}
       {media}
       <div className="t-body">
         <div className="t-quoteMark">“</div>
         <h3 className="t-name">{t.name}</h3>
         {/* Meta line now includes Program if present */}
         <p className="t-meta">
           {[t.exam, t.subject, t.year, t.program].filter(Boolean).join(' • ')}
         </p>
          {/* Keep textual rank beneath too, if present */}
          {badgeText && <p className="t-rank-inline">{badgeText}</p>}
         {t.text && <p className="t-text">{t.text}</p>}
       </div>
     </article>
   );
 }

 

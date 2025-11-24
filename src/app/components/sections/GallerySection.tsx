'use client';

import { useMemo, useState } from 'react';
import { driveProxy, driveId } from '@/lib/drive';

type Size = 'large' | 'medium' | 'small';
type Category = 'Events' | 'Lectures' | 'Results';

const filters = ['All', 'Events', 'Lectures', 'Results'] as const;

// ==== EDIT YOUR CARDS HERE ====
// Paste your Google Drive share link (…/file/d/<ID>/view) or any image URL in `image`.
const items: Array<{
  id: string;
  title: string;
  description?: string;
  category: Category;
  size: Size;
  image: string;
}> = [
  {
    id: 'g1',
    title: 'Seminar',
    description: 'Strategy session with toppers',
    category: 'Events',
    size: 'large',
    image: 'https://drive.google.com/file/d/1bJF7weyH3w9Qudhe4A4qZIQF5zgtXCgX/view',
  },
  {
    id: 'g2',
    title: 'Results',
    description: 'AIRs and merit lists',
    category: 'Results',
    size: 'medium',
    image: 'https://drive.google.com/file/d/1JTzK2Fzg2VtXKwUcV0xyb5KKwsBxDcFZ/view?usp=sharing',
  },
];

export default function GallerySection() {
  const [active, setActive] = useState<(typeof filters)[number]>('All');

  const visible = useMemo(() => {
    if (active === 'All') return items;
    return items.filter((i) => i.category === active);
  }, [active]);

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-title">
          <div className="title-text">Gallery</div>
          <div className="title-underline" />
        </div>

        <div className="gallery-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn${active === f ? ' active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {visible.map((card) => (
            <div key={card.id} className={`card gallery-item ${card.size}`}>
              <div className="gallery-image">
                <img
                  src={driveProxy(card.image)}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // If first load fails (Drive redirect blocked), force proxy by ID
                    const el = e.currentTarget as HTMLImageElement;
                    const id = driveId(el.src) || driveId(card.image);
                    if (id) el.src = `/api/drive-image?id=${id}`;
                  }}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }}
                />
              </div>

              <div className="gallery-overlay">
                <div className="gallery-title">{card.title}</div>
                {card.description && (
                  <div className="gallery-description">{card.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

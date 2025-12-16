'use client';

import { useMemo, useState } from 'react';
import { driveProxy, driveId } from '@/lib/drive';

type Size = 'large' | 'medium' | 'small';
type Category = 'Events' | 'Lectures' | 'Results';

const filters = ['All', 'Lectures', 'Results'] as const;

const youtubeEmbed = (url: string): string | null => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      return parsed.pathname.slice(1) || null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname.startsWith('/watch')) {
        return parsed.searchParams.get('v');
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2] ?? null;
      }
    }
    if (host === 'youtube-nocookie.com') {
      return parsed.pathname.split('/').pop() ?? null;
    }
  } catch (err) {
    return null;
  }
  return null;
};

// ==== EDIT YOUR CARDS HERE ====
// Paste your Google Drive share link (…/file/d/<ID>/view) or any image URL in `image`.
const items: Array<{
  id: string;
  title: string;
  description?: string;
  category: Category;
  size: Size;
  image: string;
  video?: string;
}> = [
  {
    id: 'g1',
    title: 'Celebration Highlights',
    description: 'Students and mentors celebrating milestones at Re-Wise.',
    category: 'Lectures',
    size: 'medium',
    image: 'https://drive.google.com/file/d/1gPlgHAt1iVBr-RflQ74RBlgctNAnFFec/view?usp=sharing',
    video: 'https://drive.google.com/file/d/1K4b0aQrktWcSQlsgU5dEShMBskWiX-FL/view?usp=sharing',
  },
  {
    id: 'g2',
    title: 'Classroom Session',
    description: 'Live problem solving with our mentors.',
    category: 'Lectures',
    size: 'medium',
    image: 'https://drive.google.com/file/d/1Hglze5rPlstH5k7bTFj4bNcQuF4LkC0P/view?usp=sharing',
  },
  {
    id: 'g3',
    title: 'Focused Classroom',
    description: 'Students revising concepts during a guided class.',
    category: 'Lectures',
    size: 'small',
    image: 'https://drive.google.com/file/d/1VVnYGjrlQpspElXdLk7I62-OgNkWVKsi/view?usp=sharing',
  },
  {
    id: 'g4',
    title: 'Mentor Interaction',
    description: 'Mentors ensuring every doubt is resolved.',
    category: 'Lectures',
    size: 'small',
    image: 'https://drive.google.com/file/d/1Dz09HdVLrY1wtWUgjjSpMmggxeRkyN4Y/view?usp=sharing',
  },
  {
    id: 'g5',
    title: 'Result Spotlight',
    description: 'Poster announcing top Re-Wise selections.',
    category: 'Results',
    size: 'medium',
    image: 'https://drive.google.com/file/d/1ALe41G6neOjBjZMlUj5wYV-FmETrE5Gt/view?usp=sharing',
  },
  {
    id: 'g6',
    title: 'AIR Achievers',
    description: 'Celebrating All India Rank holders from Re-Wise.',
    category: 'Results',
    size: 'small',
    image: 'https://drive.google.com/file/d/1UbwqrzUpyyOIFayUrk6LGV-0VX2b64mG/view?usp=sharing',
  },
  {
    id: 'g7',
    title: 'Result Showcase',
    description: 'Compiled highlights of recent JEE/NEET successes.',
    category: 'Results',
    size: 'small',
    image: 'https://drive.google.com/file/d/1ep5_ynwKxb501y3uLdLUdaZc3z2TwTGy/view?usp=sharing',
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

        <div className="gallery-scroll">
          {visible.map((card) => {
            const embedId = card.video ? youtubeEmbed(card.video) : null;
            const driveVideoSrc = card.video && !embedId ? driveProxy(card.video) : null;
            const isVideo = Boolean(embedId || driveVideoSrc);

            return (
              <div
                key={card.id}
                className={`gallery-card ${card.size}${isVideo ? ' gallery-card--video' : ''}`}
              >
                <div className="gallery-thumb">
                  {embedId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${embedId}?rel=0&autoplay=1&mute=1&loop=1&playlist=${embedId}`}
                      title={card.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : driveVideoSrc ? (
                    <video
                      src={driveVideoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                      preload="metadata"
                      poster={driveProxy(card.image)}
                    />
                  ) : (
                    <img
                      src={driveProxy(card.image)}
                      alt={card.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        const id = driveId(el.src) || driveId(card.image);
                        if (id) el.src = `/api/drive-image?id=${id}`;
                      }}
                    />
                  )}
                  <span className="gallery-chip">{card.category}</span>
                </div>
                <div className="gallery-info">
                  <div className="gallery-title">{card.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

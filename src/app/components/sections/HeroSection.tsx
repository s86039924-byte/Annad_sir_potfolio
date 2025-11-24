'use client';

import React, { useMemo } from 'react';
import { TickerText } from './TickerText';
import { driveProxy } from '@/lib/drive';

type ResultCard = {
  exam: string;   // e.g. "JEE Advanced 2025"
  name: string;   // e.g. "Advay Mayank"
  label: string;  // e.g. "All India Rank" or "Score"
  value: string;  // e.g. "36" or "700/720"
  img: string;    // Drive link (…/file/d/<ID>/view) or any image URL
};

export default function HeroSection() {
  // === EDIT THIS ARRAY WITH YOUR REAL DATA ===
  const resultCards: ResultCard[] = [
    {
      exam: 'JEE Advanced 2025',
      name: 'Shrestha Agarwal',
      label: 'All India Rank',
      value: '140',
      img: 'https://drive.google.com/file/d/1-fVIXSXq--qqdRFrn-oO0oZjvCeB2eVm/view?usp=sharing',
    },
    {
      exam: 'JEE Advanced 2025',
      name: 'Venkateshwar Gupta',
      label: 'ISI Rank',
      value: '17',
      img: 'https://drive.google.com/file/d/1-fVIXSXq--qqdRFrn-oO0oZjvCeB2eVm/view',
    },
    {
      exam: 'JEE Advanced 2025',
      name: 'Bipul Kumar',
      label: 'ALL INDIAN  RANK ',
      value: '140',
      img: 'https://drive.google.com/file/d/1FDWT5TUVlX_fvSjrKVThvoOwG4eIxwTH/view?usp=sharing',
    },
    {
      exam: 'JEE Advanced 2025',
      name: 'Aman Sharma',
      label: 'All India Rank',
      value: '751',
      img: 'https://drive.google.com/file/d/1Ej-KvgLdrMTKO-srY4uMJ-7ze1z3C3o6/view?usp=sharing',
    },
      {
      exam: 'JEE Advanced 2025',
      name: 'Bhargav Shekokar',
      label: 'All India Rank',
      value: '2239',
      img: 'https://drive.google.com/file/d/1MUzeCjYkDeeefbJrUF1SpQE6eRR6DW2W/view?usp=sharing',
    },
  ];

  // Duplicate for seamless infinite scroll
  const railItems = useMemo(() => [...resultCards, ...resultCards], [resultCards]);

  // Reserve image box to prevent layout shift
  const CARD_IMG_W = 180, CARD_IMG_H = 160;

  return (
    <section id="home" className="rw-hero section">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="rw-hero__inner container">
        <div className="rw-hero__left">
          <div className="hero__eyebrow">Founded by IIT-JEE & NEET Experts</div>

          <h1 className="rw-hero__title">
            <TickerText />
          </h1>

          <p className="hero-lead">
            IIT-JEE &amp; NEET mentors + AI-powered practice. Structured tests, instant solutions, and
            metrics that actually improve your score.
          </p>

          <ul className="hero__chips">
            <li><strong>10+</strong> Years Teaching</li>
            <li><strong>AIR &lt; 100</strong> Achievers</li>
            <li><strong>ALLEN</strong> Institute Alumni</li>
          </ul>

          <div className="hero__ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }} />
        </div>

        {/* Right: auto-scrolling result cards */}
        <aside className="rw-hero__right" aria-label="Recent Results">
          <div className="rw-rail" role="list">
            <div className="rw-rail__track">
              {railItems.map((c, i) => (
                <article
                  className="result-card result-card--result rw-rail__item"
                  key={`${c.name}-${i}`}
                  role="listitem"
                >
                  <div className="result-card__tag">{c.exam}</div>

                  <div className="result-card__body">
                    <div className="result-card__left">
                      <div className="result-card__name">{c.name}</div>
                      <div className="result-card__meta">{c.label}</div>
                      <div className="result-card__rank">{c.value}</div>
                    </div>

                    <div className="result-card__img-wrap" aria-hidden="true">
                      <img
                        src={driveProxy(c.img)}
                        alt={c.name}
                        className="result-card__media"
                        width={CARD_IMG_W}
                        height={CARD_IMG_H}
                        decoding="async"
                        loading="eager"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Fallback to Drive thumbnail if direct view is blocked
                          const el = e.currentTarget as HTMLImageElement;
                          const m = el.src.match(/[?&]id=([A-Za-z0-9_-]{10,})/);
                          if (m) el.src = `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1200`;
                        }}
                        style={{ objectFit: 'contain', background: '#fff', borderRadius: 8 }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

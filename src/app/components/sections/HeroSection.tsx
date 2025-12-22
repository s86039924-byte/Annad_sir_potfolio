'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { TickerText } from './TickerText';
import { driveProxy } from '@/lib/drive';

type ResultCard = {
  exam: string;   // e.g. "JEE Main 2025"
  name: string;   // e.g. "Prakhar Aggarwal"
  label: string;  // e.g. "Percentile" or "All India Rank"
  value: string;  // e.g. "99.85" or "AIR 22"
  img: string;    // Google Drive link or any image URL
};

export default function HeroSection() {
  /**
   * TODO: Replace the `img` values below with your real Google Drive links
   * for topper photos or result posters. You can add or remove cards freely.
   */
  const cards: ResultCard[] = useMemo(
    () => [
      {
        exam: 'JEE Advanced 2024',
        name: 'Aman Sharma',
        label: 'All India Rank',
        value: 'AIR 751',
        img: 'https://drive.google.com/file/d/14Kmu7yT7SrCsh-_T4gjVSBqep_InwOw3/view?usp=sharing',
      },
      {
        exam: 'JEE Advanced 2025',
        name: 'Bhavishya',
        label: 'All India Rank',
        value: 'AIR 73',
        img: 'https://drive.google.com/file/d/1UBfSoatcfYRoMQaXgo51eNrLaVukR-A5/view?usp=sharing',
      },
      {
        exam: 'JEE Advanced 2025',
        name: 'Bipul Kumar',
        label: 'All India Rank',
        value: 'AIR 109',
        img: 'https://drive.google.com/file/d/1SJDHT9Xv-EvV3ONhIT_N0KgG7QiZ3hKb/view?usp=sharing',
      },
      {
        exam: 'JEE Advanced 2025',
        name: 'Shreshtha Agrawal',
        label: 'All India Rank',
        value: 'AIR 140',
        img: 'https://drive.google.com/file/d/1w8pS86jbXivmX20jHDtZ8_QVRDlm43iv/view?usp=sharing',
      },
      {
        exam: 'ISI Entrance 2025',
        name: 'Venkatesh Gupta',
        label: 'Rank',
        value: 'ISI Rank 17',
        img: 'https://drive.google.com/file/d/1hh6HK0Pt--_lzuOg2D-2RM4bWrViHCw1/view?usp=sharing',
      },
    ],
    []
  );
  const trackCards = useMemo(() => [...cards, ...cards], [cards]);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the rank rail in a simple loop
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || cards.length <= 1) return;
    let idx = 0;
    const interval = window.setInterval(() => {
      const first = viewport.querySelector<HTMLElement>('.rw-rail__item');
      if (!first) return;
      const step = first.getBoundingClientRect().width + 16; // 16px gap fallback
      idx += 1;
      // allow smooth loop then snap back to start invisibly
      if (idx >= cards.length) {
        viewport.scrollTo({ left: 0, behavior: 'auto' });
        idx = 0;
        return;
      }
      viewport.scrollTo({ left: step * idx, behavior: 'smooth' });
    }, 2200); // faster cycle
    return () => window.clearInterval(interval);
  }, [cards.length]);

  return (
    <section
      id="home"
      className="section hero-section rw-hero"
      aria-labelledby="hero-heading"
    >
      <div className="container hero-content">
        {/* LEFT: Institute positioning */}
        <div className="rw-hero__left hero-copy">

          <h1 id="hero-heading" className="hero-title hero-title--inline">
            <span className="hero-title__brand">Re-Wise</span>
            <span className="hero-powered hero-powered--inline">
              <img
                src="/logo/acadza_logo_with_Rewise.png"
                alt="Powered by Acadza"
                className="hero-powered__logo"
                loading="lazy"
                decoding="async"
              />
              <span className="hero-powered__text">Powered by Acadza</span>
            </span>
            <span className="hero-title__ticker">
              <TickerText />
            </span>
          </h1>

          <p className="hero-subtitle">
            Mr. Anand Tiwari (Maths) and Dr. Vivek Pratap Singh (Biology) unite a decade
            of ALLEN &amp; national coaching experience with AI practice labs, pan-India
            tests, and always-on YouTube support to power Classes 9–13 for Boards,
            JEE, and NEET.
          </p>

          <div className="hero-pill-row">
            <div className="hero-pill">
              <span className="hero-pill__dot" /> National mentoring across ALLEN &amp;
              top institutes
            </div>
            <div className="hero-pill">
              <span className="hero-pill__dot" /> AI question lab + All India test
              series
            </div>
            <div className="hero-pill">
              <span className="hero-pill__dot" /> Re-Wise, Foundation &amp; Be-Wise
              channels
            </div>
          </div>
        </div>

        {/* RIGHT: Toppers rail */}
        <aside className="rw-hero__right" aria-label="Top results from Re-Wise">
          <div className="rw-rail">
            <div className="rw-rail__viewport" ref={viewportRef}>
              <div className="rw-rail__track">
                {trackCards.map((c, idx) => (
                  <article
                    key={`${c.exam}-${c.name}-${idx}`}
                    className="result-card result-card--result rw-rail__item"
                  >
                    <header className="result-card__header">
                      <div className="result-card__tag">{c.exam}</div>
                    </header>

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
                          loading={idx < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

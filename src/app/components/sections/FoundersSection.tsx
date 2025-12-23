'use client';

import React, { useEffect, useRef } from 'react';

function useCountUp() {
  const started = useRef(false);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-count]')
    );
    if (!('IntersectionObserver' in window) || targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (started.current) return;
        if (entries.some((e) => e.isIntersecting)) {
          started.current = true;

          targets.forEach((el) => {
            const target = Number(el.dataset.count || '0');
            const duration = 900;
            const start = performance.now();

            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const value = Math.floor(target * progress);
              el.textContent = value.toString();
              if (progress < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
          });

          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}

export default function FoundersSection() {
  useCountUp();

  return (
    <section id="founders" className="founders section">
      <div className="container">
        {/* Faculty cards */}
        <div id="faculty" className="section-title f-head f-head--sub">
          <div className="title-text">Core Faculty Team</div>
          <div className="title-underline" />
          <p className="f-sub">
            Subject experts who mentor Re-Wise students every day.
          </p>
        </div>

        <div className="f-stats">
          <div className="f-stat">
            <div className="f-stat__value">
              <span className="f-stat__num" data-count={5}></span>
              <span className="f-stat__plus">+</span>
            </div>
            <div className="f-stat__label">Years of Excellence</div>
          </div>

          <div className="f-stat">
            <div className="f-stat__value">
              <span className="f-stat__num" data-count={50}></span>
              <span className="f-stat__plus">+</span>
            </div>
            <div className="f-stat__label">AIR &lt; 100 &amp; 99+ %ilers</div>
          </div>

          <div className="f-stat">
            <div className="f-stat__value">
              <span className="f-stat__num" data-count={2000}></span>
              <span className="f-stat__plus">+</span>
            </div>
            <div className="f-stat__label">Successful Selections</div>
          </div>
        </div>

        <div className="faculty-grid">
          {/* Anand Tiwari */}
          <article className="faculty-card">
            <div className="faculty-card__photo-wrap">
              <img
                src="/images/founders/anand.jpg"
                alt="Anand Tiwari – Mathematics Mentor"
                className="faculty-card__photo"
                loading="lazy"
              />
            </div>
            <div className="faculty-card__body">
              <h3 className="faculty-card__name">Anand Tiwari</h3>
              <p className="faculty-card__role">
                Co-Founder &amp; Mathematics Mentor
              </p>
              <p>
                B.Tech (2015) engineer who chose classrooms over corporate roles.
                After a decade of mentoring at national institutes and ALLEN Mumbai,
                he remains obsessed with making mathematics feel achievable for every learner.
              </p>
              <ul className="faculty-card__highlights">
                <li>
                  Taught across India from 2015–2025, guiding thousands of IIT-JEE aspirants.
                </li>
                <li>
                  Helped produce AIR &lt; 100 and multiple AIR &lt; 1000 ranks while at ALLEN Mumbai (2022–24).
                </li>
                <li>
                  Co-leads Re-Wise&rsquo;s AI practice lab, national test series, and 24&times;7 YouTube support so math fear becomes math fun.
                </li>
              </ul>
            </div>
          </article>

          {/* Dr. Vivek Pratap Singh */}
          <article className="faculty-card">
            <div className="faculty-card__photo-wrap">
              <img
                src="/images/founders/vivek.jpg"
                alt="Dr. Vivek Pratap Singh – Biology Mentor"
                className="faculty-card__photo"
                loading="lazy"
              />
            </div>
            <div className="faculty-card__body">
              <h3 className="faculty-card__name">Dr. Vivek Pratap Singh</h3>
              <p className="faculty-card__role">
                Co-Founder &amp; Biology Mentor
              </p>
              <p>
                BDS (Govt. Dental College Raipur, 2018) graduate and frontline COVID volunteer
                who found his calling in empowering NEET &amp; board aspirants with empathy and scientific rigor.
              </p>
              <ul className="faculty-card__highlights">
                <li>
                  Teaching biology since 2017 with a counselling-first approach that keeps students calm and consistent.
                </li>
                <li>
                  Partnered with Anand at ALLEN Mumbai (2022–24) to deliver elite NEET outcomes.
                </li>
                <li>
                  Champions Re-Wise&rsquo;s Re-Wise, Re-Wise Foundation, and Be-Wise channels to merge academics, mindset, and life skills.
                </li>
              </ul>
            </div>
          </article>
        </div>

      </div>
    </section>
  );
}

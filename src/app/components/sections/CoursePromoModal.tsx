'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CoursePromoModal() {
  const [open, setOpen] = useState(false);
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    setBanner(true);
  };

  const closeBanner = () => {
    setBanner(false);
  };

  return (
    <>
      {open && (
        <div className="course-promo" role="dialog" aria-modal="true" aria-label="Course highlight">
          <div className="course-promo__card">
            <button className="course-promo__close" onClick={close} aria-label="Close course highlight">
              ×
            </button>
            <div className="course-promo__eyebrow">
              <span className="course-promo__badge">New</span> Courses for JEE 2026/27
            </div>
            <h3 className="course-promo__title">Join the sprint from the very first page.</h3>
            <p className="course-promo__body">
              Crash + target batches with AI practice labs, weekly mentor clinics, and DOST access. Tap in now to
              book a counselling call and secure early-bird seats.
            </p>
            <div className="course-promo__actions">
              <Link className="course-promo__btn" href="/courses" onClick={close}>
                View Courses
              </Link>
              <Link className="course-promo__link" href="/contact" onClick={close}>
                Talk to a counsellor →
              </Link>
            </div>
          </div>
        </div>
      )}
      {banner && (
        <div className="course-banner" role="region" aria-label="Courses highlight">
          <div className="course-banner__inner">
            <div className="course-banner__text">
              <span className="course-banner__eyebrow">New</span>
              <strong>JEE 2026/27 crash & target batches live.</strong>
              <span>Unlock AI practice labs, mentor clinics, and DOST access.</span>
            </div>
            <div className="course-banner__actions">
              <Link className="course-banner__btn" href="/courses" onClick={closeBanner}>
                View Courses
              </Link>
              <button className="course-banner__close" aria-label="Close banner" onClick={closeBanner}>
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CourseTopBanner() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(pathname === '/');
  }, [pathname]);

  if (!show || pathname !== '/') return null;

  return (
    <div className="course-top-banner" role="status" aria-label="Courses announcement">
      <span className="course-top-banner__badge">New</span>
      <span className="course-top-banner__text">
        JEE 2026/27 crash &amp; target batches live. Unlock AI practice labs, mentor clinics, and DOST access.
      </span>
      <div className="course-top-banner__actions">
        <Link className="course-top-banner__cta" href="/courses">
          View Courses
        </Link>
        <button className="course-top-banner__close" aria-label="Close announcement" onClick={() => setShow(false)}>
          ×
        </button>
      </div>
    </div>
  );
}

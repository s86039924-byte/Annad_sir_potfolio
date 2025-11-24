import Link from 'next/link';
import React from 'react';
import { LOGO } from '@/lib/constants';
import Image, { type StaticImageData } from 'next/image';

interface CommonNavbarProps {
  logoSrc?: string | StaticImageData;
  logoHref?: string;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export default function CommonNavbar({
  logoSrc = LOGO,
  logoHref = '/',
  centerContent,
  rightContent,
}: CommonNavbarProps) {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur"
      style={{
        background: 'var(--navbar-bg)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-14 flex items-center justify-between gap-3">
          {/* Corner logo (left) */}
          <Link href={logoHref} className="shrink-0">
            <Image
              src={logoSrc}
              alt="Coaching Logo"
              className="h-8 w-auto md:h-9"
              draggable="false"
            />
          </Link>

          {/* Center area (optional title) */}
          <div className="flex-1 flex justify-center">
            {centerContent}
          </div>

          {/* Right side: search / actions / hamburger */}
          <div className="shrink-0 flex items-center gap-2">
            {rightContent}
          </div>
        </div>
      </div>
    </header>
  );
}

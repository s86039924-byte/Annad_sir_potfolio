import Link from 'next/link';
import React from 'react';
import { LOGO } from '@/lib/constants';
import Image, { type StaticImageData } from 'next/image';
import './CommonNavbar.css';

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
      className="common-navbar"
      style={{
        background: 'var(--navbar-bg)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="common-navbar__container">
        <div className="common-navbar__inner">
          {/* Corner logo (left) */}
          <Link href={logoHref} className="common-navbar__logo">
            <Image
              src={logoSrc}
              alt="Coaching Logo"
              className="common-navbar__logo-img"
              draggable="false"
            />
          </Link>

          {/* Center area (optional title) */}
          <div className="common-navbar__center">
            {centerContent}
          </div>

          {/* Right side: search / actions / hamburger */}
          <div className="common-navbar__right">
            {rightContent}
          </div>
        </div>
      </div>
    </header>
  );
}

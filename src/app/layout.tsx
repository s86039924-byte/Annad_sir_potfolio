import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/layout/Navigation'
import ScrollProgress from './components/animations/ScrollProgress'
import ParticlesBackground from './components/animations/ParticlesBackground'
import ScrollManager from './components/layout/ScrollManager'
import Script from 'next/script'
import { cookies } from 'next/headers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Re-Wise — Transforming Education Through Innovation',
  description:
    'Re-Wise helps students prepare smarter with an integrated platform of practice, analytics, and community.',
  openGraph: {
    type: 'website',
    title: 'Re-Wise Education Platform',
    description:
      'Transform your education journey with expert mentoring and AI-powered tools',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Re-Wise' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Re-Wise - Transforming Education',
    description: 'Expert JEE & NEET mentoring with AI-powered tools',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // SSR: read theme so server HTML matches client HTML (prevents hydration mismatch)
  const cookieTheme = 'light' // or 'dark' — default theme

  return (
    <html
      lang="en"
      data-theme={cookieTheme}
      style={{ colorScheme: cookieTheme }}
      suppressHydrationWarning
    >
      <head>
        {/* Early, no-flash theme boot: sets data-theme and native color-scheme before paint */}
        <Script id="early-theme" strategy="beforeInteractive">
          {`
          (function () {
            try {
              var stored = localStorage.getItem('theme');
              var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              var theme = stored || (systemDark ? 'dark' : 'light');
              var de = document.documentElement;
              de.setAttribute('data-theme', theme);     /* Align with CSS attribute selectors */
              de.style.colorScheme = theme;             /* Native form controls & UA colors */
              // Mirror to cookie so SSR renders same attributes on next request
              document.cookie = 'theme=' + theme + '; Path=/; Max-Age=31536000; SameSite=Lax';
            } catch (e) {}
          })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ScrollManager />
        <ScrollProgress />
        <ParticlesBackground />
        <div className="page-grid-overlay" aria-hidden="true" />
        <Navigation />
        <main className="page">{children}</main>  {/* accounts for fixed nav height */}
      </body>
    </html>
  )
}

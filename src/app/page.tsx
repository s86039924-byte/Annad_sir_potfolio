'use client'

import HeroSection from './components/sections/HeroSection'
import FoundersSection from './components/sections/FoundersSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import GallerySection from './components/sections/GallerySection'
import Footer from './components/layout/Footer'
import WhyIITSFSection from './components/sections/WhyIITSFSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyIITSFSection />
      <FoundersSection />
      <TestimonialsSection />
      <GallerySection />
      <Footer />
    </>
  )
}

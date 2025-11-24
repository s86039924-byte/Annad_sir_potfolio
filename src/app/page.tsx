'use client'

import HeroSection from './components/sections/HeroSection'
import FoundersSection from './components/sections/FoundersSection'
import PlatformSection from './components/sections/PlatformSection'
import ChannelsSection from './components/sections/ChannelsSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import GallerySection from './components/sections/GallerySection'
import Footer from './components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FoundersSection />
      <PlatformSection />
      <ChannelsSection />
      <TestimonialsSection />
      <GallerySection />
      <Footer />
    </>
  )
}


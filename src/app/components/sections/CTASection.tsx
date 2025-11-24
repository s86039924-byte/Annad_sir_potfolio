'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Youtube, Bot, FileText, MessageCircle } from 'lucide-react'

export default function CTASection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const ctaItems = [
    {
      icon: Youtube,
      title: 'Subscribe to Channels',
      description: 'Access free quality content',
      gradient: 'from-red-500 to-rose-500'
    },
    {
      icon: Bot,
      title: 'Try AI Practice Tool',
      description: 'Start practicing smarter',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'Join Test Series',
      description: 'Track your progress',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageCircle,
      title: 'Get Counselling',
      description: 'Personal guidance from experts',
      gradient: 'from-green-500 to-emerald-500'
    },
  ]

  return (
    <section id="cta" ref={ref} className="cta">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title"
        >
          <h2 className="title-text">
            Start Your Journey With Us
          </h2>
          <div className="title-underline" />
          <div className="cta-subtitle">
            Join thousands of students transforming their future
          </div>
        </motion.div>

        {/* CTA Grid */}
        <div className="cta-grid">
          {ctaItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="cta-card"
              >
                <div className="cta-icon">
                  <Icon />
                </div>
                <div className="cta-title">{item.title}</div>
                <div className="cta-description">{item.description}</div>
                <div className="cta-arrow">→</div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="cta-bottom"
        >
          <button className="btn btn--primary btn--lg">
            <span>Get Started Now</span>
            <span>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Trophy, Star, Bot, Target, DollarSign, Sparkles } from 'lucide-react'

export default function DifferentiatorsSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const differentiators = [
    {
      icon: Trophy,
      title: 'ALLEN Background',
      description: 'Both founders trained at India\'s premier coaching institute',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Star,
      title: 'Proven Results',
      description: 'Students achieving AIR under 100 and many under AIR 1000',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bot,
      title: 'AI + Expert Mentoring',
      description: 'Cutting-edge technology meets personalized guidance',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Complete Ecosystem',
      description: 'Academic excellence + Personal development',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: DollarSign,
      title: 'Free + Premium',
      description: 'YouTube resources accessible to all, premium tools for serious aspirants',
      gradient: 'from-red-500 to-rose-500'
    },
    {
      icon: Sparkles,
      title: 'Holistic Approach',
      description: 'Not just exam prep, but life skills and personality development',
      gradient: 'from-indigo-500 to-violet-500'
    },
  ]

  return (
    <section id="differentiators" ref={ref} className="differentiators">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title"
        >
          <h2 className="title-text">
            What Makes Re-Wise Unique
          </h2>
          <div className="title-underline" />
        </motion.div>

        {/* Differentiators Grid */}
        <div className="differentiators-grid">
          {differentiators.map((item, index) => {
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
                className="diff-card"
              >
                <div className="diff-icon">
                  <Icon />
                </div>
                <div className="diff-title">{item.title}</div>
                <div className="diff-description">{item.description}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
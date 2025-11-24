'use client';

import './journey.css';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Footer from '../components/layout/Footer';

export default function JourneyPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const timeline = [
    {
      color: '#8E44AD',
      year: '2015–2021',
      title: 'Teaching Across India',
      description:
        'Anand Tiwari began teaching Mathematics across multiple national-level institutes, guiding thousands of IIT-JEE aspirants. Dr. Vivek Pratap Singh started mentoring Biology students, bridging science with inspiration.',
    },
    {
      color: '#3498DB',
      year: '2018',
      title: 'Medical Beginnings',
      description:
        'Dr. Vivek completed his BDS from Government Dental College, Raipur, and served selflessly in healthcare during the COVID-19 pandemic — an experience that reinforced his passion for education.',
    },
    {
      color: '#E74C3C',
      year: '2022–2024',
      title: 'ALLEN Career Institute – Mumbai',
      description:
        'Both founders collaborated at ALLEN Career Institute, Mumbai, where they mentored students who achieved remarkable ranks, including AIR 17 and several under AIR 1000.',
      image: '/journey/allen.jpg',
    },
    {
      color: '#27AE60',
      year: '2024',
      title: 'Birth of Re-Wise',
      description:
        'Re-Wise was founded — a next-generation digital education platform integrating AI-driven practice, personalized mentorship, and a holistic learning ecosystem.',
      image: '/journey/rewise-launch.jpg',
    },
    {
      color: '#F39C12',
      year: '2025',
      title: 'YouTube Expansion & AI Tools',
      description:
        'Launched three channels — Re-Wise (JEE/NEET), Re-Wise Foundation, and Be-Wise — offering free lectures, strategy sessions, and motivational talks. The AI-powered Practice Tool was released.',
      image: '/journey/youtube.jpg',
    },
    {
      color: '#16A085',
      year: '2025–2026',
      title: 'Student Success & Celebrations',
      description:
        'Students secured top AIR ranks and remarkable board results. Community events and celebrations reflected the growing Re-Wise family.',
      image: '/journey/results.jpg',
    },
  ];

  return (
    <main className="journey-wrapper journey-page">
      {/* --- HEADER --- */}
      <section className="journey-header">
        <h1 className="journey-title">Our Journey</h1>
        <p className="journey-subtitle">
          From classrooms to a digital revolution — the story of Re-Wise.
        </p>
      </section>

      {/* --- TIMELINE --- */}
      <div className="journey-timeline">
        {/* Gradient path */}
        <svg className="timeline-svg" viewBox="0 0 200 2600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="animatedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8E44AD">
                <animate
                  attributeName="stop-color"
                  values="#8E44AD;#3498DB;#27AE60;#F39C12;#16A085;#8E44AD"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#3498DB">
                <animate
                  attributeName="stop-color"
                  values="#3498DB;#27AE60;#F39C12;#8E44AD;#16A085;#3498DB"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>

          <path
            d={
              isMobile
                ? 'M70,0 L70,2600'
                : 'M100,0 C230,200 -30,400 100,600 C230,800 -30,1000 100,1200 C230,1400 -30,1600 100,1800 C230,2000 -30,2200 100,2400'
            }
            stroke="url(#animatedGradient)"
            strokeWidth={isMobile ? 10 : 18}
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>

        {timeline.map((step, i) => {
          const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
          const isLeft = !isMobile && i % 2 === 0;

          return (
            <motion.div
              key={step.year}
              ref={ref}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className={`timeline-item ${isLeft ? 'left' : 'right'}`}
            >
              <div className="timeline-circle" style={{ backgroundColor: step.color }}>
                <span>{i + 1}</span>
              </div>

              {isMobile && <div className="timeline-connector" />}

              <motion.div
                className="timeline-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="timeline-year">{step.year}</h3>
                <h4 className="timeline-title">{step.title}</h4>
                <p className="timeline-text">{step.description}</p>

                {step.image && (
                  <div className="timeline-img">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={500}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <Footer />
    </main>
  );
}

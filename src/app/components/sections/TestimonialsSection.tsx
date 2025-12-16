'use client'

import { useEffect, useMemo, useState } from 'react'
import { getTestimonials, type Testimonial } from '@/lib/testimonials'
import { driveProxy } from '@/lib/drive'
import localStore from '@/lib/localStore'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('')
}

export default function TestimonialsSection() {
  const [base, setBase] = useState<Testimonial[]>([])
  const [stored, setStored] = useState<Testimonial[]>([])

  useEffect(() => {
    let alive = true
    getTestimonials()
      .then(data => {
        if (alive) setBase(Array.isArray(data) ? data : [])
      })
      .catch(() => alive && setBase([]))
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    const update = () => setStored(localStore.loadAll())
    update()
    const handler = () => update()
    window.addEventListener('storage', handler)
    window.addEventListener(localStore.changeEvent, handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener(localStore.changeEvent, handler)
    }
  }, [])

  const testimonials = useMemo(() => {
    const merged = [...stored, ...base]
    return merged.filter(t => t.kind === 'text' && t.text?.trim())
  }, [stored, base])

  return (
    <section id="testimonials" className="testimonials dark">
      <div className="container">
        <div className="section-title">
          <div className="title-text">Testimonials</div>
          <div className="title-underline" />
        </div>

        {testimonials.length === 0 ? (
          <p className="t-empty">More testimonials coming soon.</p>
        ) : (
          <div className="testimonials-marquee">
            <div
              className="testimonials-track"
              style={{ animationDuration: `${Math.max(testimonials.length * 6, 24)}s` }}
            >
              {[...testimonials, ...testimonials].map((t, idx) => (
                <article
                  key={`${t.id}-${idx}`}
                  className="testimonial-card"
                  aria-hidden={idx >= testimonials.length}
                >
                  <div className="testimonial-top">
                    <div className="testimonial-identity">
                    <div className={`testimonial-avatar${t.image?.url ? ' testimonial-avatar--photo' : ''}`}>
                      {t.image?.url ? (
                        <img
                          src={driveProxy(t.image.url)}
                          alt={t.image.alt || t.name}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        initials(t.name)
                      )}
                    </div>
                      <div className="testimonial-info">
                        <div className="testimonial-name">{t.name}</div>
                        {t.short ? <div className="testimonial-achievement">{t.short}</div> : null}
                        {t.subject ? <div className="testimonial-course">{t.subject}</div> : null}
                      </div>
                    </div>
                    {t.stars ? (
                      <div className="testimonial-stars" aria-label={`${t.stars} star rating`}>
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <span
                            key={starIdx}
                            className={`star ${starIdx < (t.stars || 0) ? 'active' : ''}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <blockquote className="testimonial-quote">{t.text}</blockquote>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

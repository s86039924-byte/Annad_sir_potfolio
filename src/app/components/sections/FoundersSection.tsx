'use client'
import { useEffect, useRef } from 'react'

const ANAND_IMG = 'https://drive.google.com/your-anand-link-here'
const VIVEK_IMG = 'https://drive.google.com/your-vivek-link-here'

function useCountUp() {
  const started = useRef(false)
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'))
    if (!('IntersectionObserver' in window) || targets.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        if (started.current) return
        if (entries.some((e) => e.isIntersecting)) {
          started.current = true
          targets.forEach((el) => {
            const end = Number(el.dataset.count || 0)
            let t0: number | undefined
            function step(ts: number) {
              if (t0 === undefined) t0 = ts
              const p = Math.min((ts - t0) / 900, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              el.textContent = String(Math.floor(end * eased))
              if (p < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          })
        }
      },
      { threshold: 0.35 },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function GlowTiltCard({
  children,
  accent,
}: {
  children: React.ReactNode
  accent: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -6
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 6
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.removeProperty('--mx')
    el.style.removeProperty('--my')
    el.style.transform = 'rotateX(0) rotateY(0)'
  }
  return (
    <article
      ref={ref}
      className="card founder-card f-card"
      style={{ ['--accent' as any]: accent }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="f-card__accent" />
      {children}
    </article>
  )
}

export default function FoundersSection() {
  useCountUp()
  return (
    <section id="founders" className="founders">
      <div className="container">
        {/* Header band */}
        <div className="section-title f-head">
          <div className="title-text">Founders</div>
          <div className="title-underline" />
          <p className="f-sub">IIT-JEE &amp; NEET mentors with 10+ years — ALLEN alumni</p>
        </div>

        {/* Stats row */}
        <div className="f-stats">
          <div className="f-stat">
            <div className="f-stat__value">
              <span className="f-stat__num" data-count={10}></span>
              <span className="f-stat__plus">+</span>
            </div>
            <div className="f-stat__label">Years Teaching</div>
          </div>
          <div className="f-stat">
            <div className="f-stat__value">
              <span className="f-stat__num" data-count={1}></span>
              <span className="f-stat__plus">+</span>
            </div>
            <div className="f-stat__label">AIR &lt; 100 Achievers</div>
          </div>
          <div className="f-stat">
            <div className="f-stat__value">
              <span className="f-stat__num" data-count={6}></span>
              <span className="f-stat__plus">+</span>
            </div>
            <div className="f-stat__label">Cities Taught</div>
          </div>
          <div className="f-stat">
            <div className="f-stat__value">
              <span className="f-stat__num" data-count={1000}></span>
              <span className="f-stat__plus">+</span>
            </div>
            <div className="f-stat__label">Students Mentored</div>
          </div>
        </div>

        <div className="founders-grid">
          {/* Founder 1 */}
          <GlowTiltCard accent="#16b3c4">
            <div className="founder-avatar">
              {ANAND_IMG ? (
                <img src={ANAND_IMG} alt="Anand Tiwari" className="founder-photo" />
              ) : (
                <div className="avatar-placeholder">AT</div>
              )}
              <div className="avatar-glow" />
            </div>
            <div className="founder-info">
              <h3 className="founder-name">Anand Tiwari</h3>
              <p className="founder-title">Co-Founder &amp; Mathematics Mentor</p>
              <p className="founder-education">B.Tech (2015)</p>
            </div>

            <div className="founder-achievement">
              <strong>Venkatesh Gupta</strong> - ISI AIR 17
            </div>

            <div className="founder-timeline f-timeline">
              <h4>Highlights</h4>
              <div className="timeline-item f-tl-item">
                <div className="timeline-year f-year">2015</div>
                <div className="timeline-desc f-text">B.Tech graduate</div>
              </div>
              <div className="timeline-item f-tl-item">
                <div className="timeline-year f-year">2017–2025</div>
                <div className="timeline-desc f-text">National-level institutes across cities</div>
              </div>
              <div className="timeline-item f-tl-item">
                <div className="timeline-year f-year">2022–2024</div>
                <div className="timeline-desc f-text">ALLEN Career Institute, Mumbai</div>
              </div>
            </div>

            <blockquote className="founder-quote">
              With the right structure and guidance, every student can conquer mathematics.
            </blockquote>
          </GlowTiltCard>

          {/* Founder 2 */}
          <GlowTiltCard accent="#ff7a59">
            <div className="founder-avatar">
              {VIVEK_IMG ? (
                <img src={VIVEK_IMG} alt="Dr. Vivek Pratap Singh" className="founder-photo" />
              ) : (
                <div className="avatar-placeholder">VP</div>
              )}
              <div className="avatar-glow" />
            </div>
            <div className="founder-info">
              <h3 className="founder-name">Dr. Vivek Pratap Singh</h3>
              <p className="founder-title">Co-Founder &amp; Biology Mentor</p>
              <p className="founder-education">BDS, Govt Dental College, Raipur (2018)</p>
            </div>

            <div className="founder-timeline f-timeline">
              <h4>Highlights</h4>
              <div className="timeline-item f-tl-item">
                <div className="timeline-year f-year">2018</div>
                <div className="timeline-desc f-text">Graduated in Dentistry</div>
              </div>
              <div className="timeline-item f-tl-item">
                <div className="timeline-year f-year">2020</div>
                <div className="timeline-desc f-text">Dedicated to holistic mentoring</div>
              </div>
              <div className="timeline-item f-tl-item">
                <div className="timeline-year f-year">2022–2024</div>
                <div className="timeline-desc f-text">ALLEN Career Institute, Mumbai</div>
              </div>
            </div>

            <blockquote className="founder-quote">
              Through education, it’s possible to contribute more to society than by practicing dentistry alone.
            </blockquote>
          </GlowTiltCard>
        </div>

        {/* CTA band */}
        <div className="fs-cta">
          <h3 className="fs-cta-title">Want guidance from the founders?</h3>
          <p className="fs-cta-sub">
            Book a quick discovery call — we’ll help you choose the right path for JEE/NEET.
          </p>
          <div className="fs-cta-actions">
            <a
              className="btn btn-primary"
              href="https://forms.gle/Z6ckdqajNSVgFsUw6"
              target="_blank"
              rel="noreferrer"
            >
              Book a Call
            </a>
            <a
              className="btn btn-ghost"
              href="https://wa.me/919999999999?text=Hi%20I%27d%20like%20to%20talk%20to%20the%20founders"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

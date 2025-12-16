import type { Metadata } from 'next'
import Link from 'next/link'

type Course = {
  id: string
  name: string
  tagline: string
  emoji: string
  target: string
  summary: string
  start: string
  end: string
  price: string
  discountedPrice?: string
  dost: string
  highlights: string[]
  badge?: string
  theme: {
    background: string
    border: string
    accent: string
  }
}

const heroBenefits = [
  'Crash courses tuned for JEE 2027 attempts',
  '50%+ fee drops with complimentary DOST access',
  'Weekly practice + mentor-led doubt clinics',
]

const heroStats = [
  { value: '120+', label: 'Top AIR ranks mentored' },
  { value: '4.8/5', label: 'Parent satisfaction score' },
  { value: '3k+', label: 'Annual guided study hours' },
]

const courses: Course[] = [
  {
    id: 'jee11-crash',
    name: '11th Crash Course',
    tagline: 'JEE Main + Advanced 2027 Sprint',
    emoji: '📘',
    theme: {
      background: 'linear-gradient(135deg, #fffbea, #fde68a)',
      border: 'rgba(250, 204, 21, 0.6)',
      accent: '#ca8a04',
    },
    target: 'For current Class 11 aspirants eyeing the 2027 JEE attempt.',
    summary:
      'A 90-day accelerated concept-to-practice bridge with structured doubt solving, mock drills and ongoing practice batch access after March.',
    start: '5 Jan 2026',
    end: '31 Mar 2026',
    price: '₹6,000',
    discountedPrice: '₹2,500',
    dost: 'Acadza Dost: Free',
    highlights: [
      '📘 3 concept days + 1 guided practice day • 120-min sessions',
      '🧩 Basic-to-advanced worksheets with weekend problem-solving camps',
      '🚀 Practice batch continues post-March for JEE Main & Advanced polishing',
    ],
    badge: 'Includes DOST + Practice Batch',
  },
  {
    id: 'jee12-target',
    name: 'JEE 12 Target Batch',
    tagline: 'Main + Advanced 2027',
    emoji: '🚀',
    theme: {
      background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
      border: 'rgba(59, 130, 246, 0.35)',
      accent: '#2563eb',
    },
    target: 'For Class 12 students beginning their full-syllabus JEE preparation.',
    summary:
      'Covers XI revision + XII depth with x-factor practice sessions, regular CBTs and immediate jump into post-course revision tests.',
    start: '17 Mar 2026',
    end: '30 Sep 2026',
    price: '₹6,000',
    discountedPrice: '₹3,000',
    dost: 'Acadza Dost: Free',
    highlights: [
      '📘 3 concept days + 1 practice + extra strategy classes weekly',
      '⏱️ 135-min advanced problem solving blocks with homework review',
      '🚀 Post-September, regular practice sessions for JEE Main & Advanced',
    ],
    badge: 'Full XII + XI revision',
  },
  {
    id: 'practice-doubt',
    name: 'Practice & Doubt Sessions',
    tagline: 'IIT Maths + NEET Zoology',
    emoji: '🧠',
    theme: {
      background: 'linear-gradient(135deg, #fdf4ff, #ede9fe)',
      border: 'rgba(147, 51, 234, 0.35)',
      accent: '#7c3aed',
    },
    target: 'Open only to IIT Mathematics & NEET Zoology students needing guided practice.',
    summary:
      'Mentor-led solution marathons focused on problem solving, doubt clearance and exam temperament without the noise of full-course lectures.',
    start: 'Weekly slots (rolling enrolment)',
    end: 'Runs through the 2026 season',
    price: '₹0',
    dost: 'Acadza Dost: Available as paid add-on',
    highlights: [
      '⏱️ 120-min intensive problem solving once every week',
      '💬 Submission-based discussion threads for tougher doubts',
      '🎯 Priority access to mentor panel for exam strategy questions',
    ],
    badge: 'Subject-specific clinic',
  },
]

export const metadata: Metadata = {
  title: 'Courses | Re-Wise',
  description:
    'Explore Re-Wise crash courses, target batches, and practice clinics for JEE 2027 with discounted fees, DOST access, and mentor-led doubt support.',
}

export default function CoursesPage() {
  return (
    <main className="courses-page">
      <section className="courses-hero">
        <div className="container">
          <div className="courses-hero__grid">
            <div className="courses-hero__content">
              <p className="eyebrow">Programs for every serious aspirant</p>
              <h1>Courses at Re-Wise</h1>
              <p className="lead">
                From first exposure to IIT-JEE concepts to board + JEE excellence, our structured programs
                keep students disciplined, mentored and exam ready.
              </p>

              <ul className="hero-benefits">
                {heroBenefits.map((benefit) => (
                  <li key={benefit}>
                    <span className="hero-benefits__bullet" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="hero-cta-row">
                <Link
                  href="https://docs.google.com/forms/d/1T6fld5H-kIt9OrEGFeAbs-EKD6dzTDGpQOCICIradeg/edit"
                  className="btn btn--primary hero-cta"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a Counselling Call
                </Link>
                <Link href="/testimonials" className="btn hero-cta hero-cta--ghost">
                  See Recent Rankers
                </Link>
              </div>
            </div>

            <div className="courses-hero__spotlight">
              <div className="dream-card">
                <p className="dream-card__tag">Dreamers ➝ Rankers</p>
                <h3>Picture your name on our next AIR wall.</h3>
                <p>
                  Every batch runs with an outcome charter — curated study plans, personal mentorship and exam
                  rehearsals until confidence is routine.
                </p>

                <ul className="dream-card__stats">
                  {heroStats.map((stat) => (
                    <li key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </li>
                  ))}
                </ul>

                <p className="dream-card__note">Limited premium seats. Enrol early to unlock scholarships.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="courses-grid container">
        {courses.map((course) => (
          <article
            key={course.id}
            className={`course-card course-card--${course.id}`}
            style={{
              background: course.theme.background,
              borderColor: course.theme.border,
            }}
          >
            <span className="course-card__halo" aria-hidden />
            {course.badge ? <span className="course-card__badge">{course.badge}</span> : null}
            <div className="course-card__header">
              <p className="course-tagline">{course.tagline}</p>
              <div className="course-card__title-row">
                <h2>{course.name}</h2>
                <span className="course-card__emoji" aria-hidden>
                  {course.emoji}
                </span>
              </div>
              <p className="course-audience">{course.target}</p>
            </div>

            <div className="course-card__price">
              {course.discountedPrice ? (
                <>
                  <span className="course-card__price--strike">{course.price}</span>
                  <span className="course-card__price--current">{course.discountedPrice}</span>
                </>
              ) : (
                <span className="course-card__price--current">{course.price}</span>
              )}
            </div>

            <p className="course-description">{course.summary}</p>

            <div className="course-meta">
              <div className="course-meta__item">
                <strong>🚀 Start</strong>
                <span>{course.start}</span>
              </div>
              <div className="course-meta__item">
                <strong>🏁 End</strong>
                <span>{course.end}</span>
              </div>
              <div className="course-meta__item">
                <strong>🤝 DOST</strong>
                <span>{course.dost}</span>
              </div>
            </div>

            <ul className="course-highlights">
              {course.highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div
              className="course-card__accent"
              style={{ background: course.theme.accent }}
            />
          </article>
        ))}
      </section>

      <section className="courses-cta">
        <div className="container">
          <div>
            <p className="eyebrow">Ready to start?</p>
            <h2>We don&apos;t just teach – we transform aspirants into achievers.</h2>
            <p>
              Visit our campus or contact the academic team to know batches, scholarship tests and the
              best course fit for your ward.
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}

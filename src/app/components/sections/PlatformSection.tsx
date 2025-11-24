'use client'

export default function PlatformSection() {
  return (
    <section id="platform" className="platform">
      <div className="container">
        <div className="section-title">
          <div className="title-text">Platform</div>
          <div className="title-underline" />
        </div>

        <div className="card mission-box">
          <div className="mission-icon">🎯</div>
          <div className="mission-content">
            <h3>Our Mission</h3>
            <p>
              A next-generation digital education platform connecting millions of students across India for Boards, JEE, and NEET success.
            </p>
          </div>
        </div>

        <h3 className="offerings-title">Offerings</h3>
        <div className="offerings-grid">
          <article className="card offering-card">
            <div className="offering-icon">📚</div>
            <h4 className="offering-title">Boards + Foundation</h4>
            <p className="offering-description">Concept-first learning with rigorous practice and mentoring.</p>
            <ul className="offering-features">
              <li>Structured notes</li>
              <li>Practice assignments</li>
              <li>Doubt support</li>
            </ul>
          </article>

          <article className="card offering-card">
            <div className="offering-icon">🧪</div>
            <h4 className="offering-title">JEE/NEET</h4>
            <p className="offering-description">Exam-simulated practice with analytics and revision plans.</p>
            <ul className="offering-features">
              <li>AI-driven analysis</li>
              <li>Mock tests</li>
              <li>Mentor reviews</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
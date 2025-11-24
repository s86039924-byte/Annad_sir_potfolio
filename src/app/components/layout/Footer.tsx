'use client'

export default function Footer() {
  return (
    <footer className="footer" id="cta">
      <div className="container footer-content">
        <div className="footer-logo">Re-Wise</div>
        <p className="footer-tagline">Transforming Education Through Passion & Innovation</p>

        <div className="social-links">
          <a href="#" className="social-link" aria-label="YouTube">▶</a>
          <a href="#" className="social-link" aria-label="Instagram">◉</a>
          <a href="#" className="social-link" aria-label="Telegram">✈</a>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Re-Wise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
'use client'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title">
          <div className="title-text">Testimonials</div>
          <div className="title-underline" />
        </div>

        <div className="testimonials-carousel">
          <div className="testimonials-container">
            <article className="card testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">VG</div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Venkatesh Gupta</div>
                  <div className="testimonial-achievement">ISI AIR 17</div>
                  <div className="testimonial-course">Mathematics</div>
                </div>
                <div className="testimonial-stars">
                  <span className="star active">★</span>
                  <span className="star active">★</span>
                  <span className="star active">★</span>
                  <span className="star active">★</span>
                  <span className="star active">★</span>
                </div>
              </div>
              <p className="testimonial-text">
                The structured guidance and exam-like practice helped improve speed and accuracy dramatically.
              </p>
            </article>

            <article className="card testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">AS</div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Anshul</div>
                  <div className="testimonial-achievement">JEE Topper</div>
                  <div className="testimonial-course">Physics</div>
                </div>
                <div className="testimonial-stars">
                  <span className="star active">★</span>
                  <span className="star active">★</span>
                  <span className="star active">★</span>
                  <span className="star active">★</span>
                  <span className="star active">★</span>
                </div>
              </div>
              <p className="testimonial-text">
                Concept clarity with practice analytics made revisions targeted and effective.
              </p>
            </article>
          </div>

          <div className="testimonials-nav">
            <button className="testimonials-arrow">{'<'}</button>
            <div className="testimonials-dots">
              <div className="testimonial-dot active" />
              <div className="testimonial-dot" />
              <div className="testimonial-dot" />
            </div>
            <button className="testimonials-arrow">{'>'}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

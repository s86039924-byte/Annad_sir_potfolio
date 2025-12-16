'use client';

import './contact.css';

const formUrl = 'https://forms.gle/your-form-link';

const contactChannels = [
  {
    title: 'Book a Counselling Call',
    description:
      'Share student details and our academic counsellors will call back with personalised guidance within one business day.',
    action: { label: 'Fill the form', href: formUrl, external: true },
    meta: 'Preferred for parents exploring batches, scholarships or hostel support.',
  },
  {
    title: 'Talk on WhatsApp',
    description:
      'Chat instantly with Team Re-Wise for quick clarifications about admission test, batches or results.',
    action: { label: 'Message on WhatsApp', href: 'https://wa.me/917470955566', external: true },
    meta: '+91 747 095 5566 · Available 10 AM – 8 PM',
  },
  {
    title: 'Email Us',
    description:
      'Send documents, counselling requests or collaboration ideas and we will respond within 24 hours.',
    action: { label: 'Email rewise631@gmail.com', href: 'mailto:rewise631@gmail.com' },
    meta: 'Attach student details, class and preferred programme.',
  },
];

export default function ContactPage() {
  return (
    <main className="page contact-page">
      <section className="contact-hero">
        <div className="container">
          <p className="contact-eyebrow">Need help choosing the right path?</p>
          <h1>Speak with the Re-Wise team</h1>
          <p className="contact-lede">
            Parents and students can book a counselling call, chat on WhatsApp or drop us an email.
            We respond quickly so you can make confident decisions about Boards, JEE and NEET prep.
          </p>
          <div className="contact-hero-actions">
            <a className="contact-btn contact-btn--primary" href={formUrl} target="_blank" rel="noreferrer">
              Book counselling
            </a>
            <a className="contact-btn contact-btn--ghost" href="https://wa.me/917470955566" target="_blank" rel="noreferrer">
              WhatsApp now
            </a>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {contactChannels.map(channel => (
              <article key={channel.title} className="contact-card">
                <div className="contact-card__header">
                  <h2>{channel.title}</h2>
                  {channel.meta && <span className="contact-card__meta">{channel.meta}</span>}
                </div>
                <p>{channel.description}</p>
                <a
                  className="contact-link"
                  href={channel.action.href}
                  target={channel.action.external ? '_blank' : undefined}
                  rel={channel.action.external ? 'noreferrer' : undefined}
                >
                  {channel.action.label}
                </a>
              </article>
            ))}
          </div>

          <div className="contact-help-box">
            <h3>Visit the campus</h3>
            <p>
              Re-Wise Campus, Saharanpur · Monday to Saturday, 10 AM – 7 PM. <br />
              Walk in for spot counselling, admission form assistance or doubt resolution.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

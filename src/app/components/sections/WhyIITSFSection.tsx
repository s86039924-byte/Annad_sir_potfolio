'use client';

const founders = [
  {
    eyebrow: 'Math Mentor',
    name: 'Anand Tiwari',
    punch: '10 yrs | ALLEN Mumbai 2022–24',
    summaryTop:
      'B.Tech (2015) graduate who turned down corporate routes to coach IIT JEE aspirants across India.',
    summaryBottom:
      'From 2015–2025 he taught at national institutes and ALLEN Mumbai, shaping thousands of journeys.',
    bullets: [
      'Mentored AIR < 100 and multiple AIR < 1000 ranks.',
      'Turns Math fear into fun with crisp strategies & drills.',
      'National teaching stints (2015–2025) across top institutes.',
      'B.Tech engineer who chose teaching over corporate offers.',
    ],
    photo: '/images/founders/anand.jpg',
  },
  {
    eyebrow: 'Biology Mentor',
    name: 'Dr. Vivek Pratap Singh',
    punch: 'Dentist • Mentor since 2017',
    summaryTop:
      'BDS (Govt. Dental College Raipur, 2018) and COVID-19 frontline volunteer turned full-time mentor.',
    summaryBottom:
      'Blends scientific precision with empathetic counselling to keep NEET & board aspirants motivated.',
    bullets: [
      'Guided NEET & board toppers with compassionate coaching.',
      'Believes education changes more lives than a clinic can.',
      'BDS graduate who served on the COVID-19 frontlines.',
      'Known for counselling-heavy approach that keeps students calm.',
    ],
    photo: '/images/founders/vivek.jpg',
  },
];

const platformHighlights = [
  { icon: '🤖', title: 'AI Practice Lab', text: 'Unlimited questions, instant solutions, detailed analytics.', accent: '#22c55e' },
  { icon: '🧪', title: 'All India Tests', text: 'Real exam simulations with performance breakdowns.', accent: '#0ea5e9' },
  { icon: '📺', title: 'Always-On Support', text: 'YouTube classes, strategy shorts, and motivation.', accent: '#f59e0b' },
];

const channels = [
  {
    icon: '🎯',
    title: 'Re-Wise',
    sub: 'JEE + NEET (XI, XII, Droppers)',
    highlights: ['Deep subject lectures', 'Exam strategy & motivation', 'Practice playlists'],
  },
  {
    icon: '📘',
    title: 'Re-Wise Foundation',
    sub: 'Classes 9 & 10',
    highlights: ['Concept + NCERT boosters', 'Board exam tips', 'IOQM / early JEE-NEET'],
  },
  {
    icon: '🌱',
    title: 'Be-Wise',
    sub: 'Overall Development',
    highlights: ['Career & subject counselling', 'Stress + time management', 'Confidence & communication'],
  },
];

export default function WhyIITSFSection() {
  return (
    <section id="why-iitsf" className="why-iitsf section">
      <div className="container">
        <div className="section-title">
          <div className="title-text">Why Re-Wise</div>
          <div className="title-underline" />
          <p className="f-sub">
            Sharp mentors, AI practice, and a trio of channels – everything focused on real results.
          </p>
        </div>

        <div className="why-iitsf__content why-iitsf__content--wide">
          <div className="founder-row">
            {founders.map(f => (
              <article key={f.name} className="founder-card founder-card--compact">
                <div className="founder-card__header">
                  <div
                    className="founder-card__avatar"
                    style={f.photo ? { backgroundImage: `url(${f.photo})` } : undefined}
                    aria-hidden={!f.photo}
                  >
                    {!f.photo ? f.name.split(' ').map(part => part[0]).join('') : null}
                  </div>
                  <div className="founder-card__details">
                    <div className="founder-card__eyebrow">{f.eyebrow}</div>
                    <h3>{f.name}</h3>
                    <p className="founder-card__punch">{f.punch}</p>
                  </div>
                </div>
                <div className="founder-card__bio">
                  <p>{f.summaryTop}</p>
                  <p>{f.summaryBottom}</p>
                  <ul>
                    {f.bullets.map(line => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <article className="founder-card founder-card--platform founder-card--horizontal">
            <div className="founder-card__eyebrow">About the Platform</div>
            <p className="platform-lede">
              Coaching-grade mentors + digital pace. Three signals to get you exam-ready:
            </p>
            <div className="platform-highlight-row">
              {platformHighlights.map(item => (
                <div key={item.title} className="platform-highlight">
                  <div
                    className="platform-highlight__halo"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${item.accent}33, transparent 60%)` }}
                  />
                  <div
                    className="platform-highlight__icon"
                    style={{
                      background: `linear-gradient(135deg, ${item.accent}, ${item.accent}aa)`,
                      boxShadow: `0 10px 30px ${item.accent}44`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="platform-highlight__body">
                    <div className="platform-highlight__title">{item.title}</div>
                    <p className="platform-highlight__text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="channel-row">
            {channels.map(channel => (
              <article key={channel.title} className="why-channel-card">
                <div className="why-channel-card__icon">{channel.icon}</div>
                <div className="why-channel-card__body">
                  <h3>{channel.title}</h3>
                  <p className="why-channel-card__sub">{channel.sub}</p>
                  <ul>
                    {channel.highlights.map(h => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

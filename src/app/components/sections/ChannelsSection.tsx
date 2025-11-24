'use client'

export default function ChannelsSection() {
  return (
    <section id="channels" className="channels">
      <div className="container">
        <div className="section-title">
          <div className="title-text">Channels</div>
          <div className="title-underline" />
        </div>

        <div className="channels-grid">
          <article className="card channel-card jee-neet">
            <div className="channel-header">
              <div className="channel-icon">🚀</div>
              <h3 className="channel-name">JEE/NEET</h3>
            </div>
            <div className="channel-target">Classes 11-13 & Droppers</div>
            <div className="channel-content">
              <h4>Includes</h4>
              <ul>
                <li>Concept lectures</li>
                <li>PYQ analysis</li>
                <li>Mock tests</li>
              </ul>
            </div>
            <div className="channel-goal">
              Goal: <strong>Top percentile ranks</strong> with systematic preparation
            </div>
          </article>

          <article className="card channel-card foundation">
            <div className="channel-header">
              <div className="channel-icon">🌱</div>
              <h3 className="channel-name">Foundation</h3>
            </div>
            <div className="channel-target">Classes 9-10</div>
            <div className="channel-content">
              <h4>Includes</h4>
              <ul>
                <li>Concept mastery</li>
                <li>Practice sheets</li>
                <li>Weekly tests</li>
              </ul>
            </div>
            <div className="channel-goal">
              Goal: <strong>Strong fundamentals</strong> for advanced tracks
            </div>
          </article>

          <article className="card channel-card bewise">
            <div className="channel-header">
              <div className="channel-icon">💡</div>
              <h3 className="channel-name">BeWise</h3>
            </div>
            <div className="channel-target">All classes</div>
            <div className="channel-content">
              <h4>Includes</h4>
              <ul>
                <li>Tips & tricks</li>
                <li>Strategy sessions</li>
                <li>Motivation</li>
              </ul>
            </div>
            <div className="channel-goal">
              Goal: <strong>Consistent growth</strong> with smart strategies
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

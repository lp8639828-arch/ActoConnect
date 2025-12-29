import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-box">
        <div className="about-hero">
          <h1>About ActoConnect</h1>
          <p className="about-tagline">Bridging talent with opportunity in the Indian film industry</p>
        </div>
      </div>

      <div className="container max-width">

        <div className="about-box">
          <section className="our-story-section">
            <div className="our-story-content">
              <section className="story-section">
                <h2>Our Story</h2>
                <div className="story-content">
                  <div className="story-text">
                    <p>
                      Founded in 2025, ActoConnect emerged from a simple yet powerful vision: to democratize
                      the casting process in Indian cinema. We recognized that countless talented actors and
                      directors were missing opportunities due to fragmented networks and outdated methods.
                    </p>
                    <p>
                      Our platform serves as the digital bridge connecting aspiring actors with visionary
                      directors, creating a seamless ecosystem where talent meets opportunity. We've built
                      a community that values creativity, professionalism, and mutual growth.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

        <div className="about-box">
          <section className="our-vision-section">
            <div className="our-vision-content">
              <section className="vision-section">
                <h2>Our Vision</h2>
                <div className="vision-content">
                  <div className="vision-text">
                    <p>
                      To become the most trusted and innovative platform in the Indian entertainment industry,
                      revolutionizing how talent is discovered, nurtured, and connected with opportunities.
                      We envision a future where every aspiring actor has equal access to life-changing
                      opportunities, and every director can find the perfect talent for their creative vision.
                    </p>
                    <p>
                      Through cutting-edge technology and unwavering commitment to excellence, we aim to
                      bridge the gap between raw talent and golden opportunities, creating a more inclusive
                      and dynamic entertainment ecosystem that celebrates diversity and fosters innovation.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

        <div className="about-box">
          <section className="founder-vision">
            <div className="founder-box">
              <section className="founder-section">
                <h2>Founder & CEO</h2>
                <div className="founder-card">
                  <div className="founder-content">
                    <h3>Lucky Parmar</h3>
                    <p className="founder-title">Founder & CEO</p>
                    <p>
                      "In the heart of Bollywood's magic, I saw a gap between raw talent and golden opportunities.
                      ActoConnect was born to ensure that every actor gets their moment in the spotlight, and every
                      director finds the perfect cast for their vision. Where every star begins."
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

        <section className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <h3>Shreyash Shivnani</h3>
              <p className="team-role">Lead Developer</p>
              <p>Passionate about creating innovative solutions for the entertainment industry.</p>
            </div>
            <div className="team-member">
              <h3>Nikita Vishwakarma</h3>
              <p className="team-role">UI/UX Designer</p>
              <p>Crafting beautiful and intuitive experiences for our users.</p>
            </div>
            <div className="team-member">
              <h3>Varun Leve</h3>
              <p className="team-role">Marketing Specialist</p>
              <p>Connecting our platform with the right talent and opportunities.</p>
            </div>
          </div>
        </section>

        <section className="mission-section">
          <div className="mission-card">
            <h2>Our Mission & Achievements</h2>
            <p className="mission-text">
              "Where every star begins."
            </p>
            <div className="mission-values">
              <div className="value-item">
                <h4>🎭 Inclusivity</h4>
                <p>Creating equal opportunities for actors from all backgrounds and regions</p>
              </div>
              <div className="value-item">
                <h4>🎬 Innovation</h4>
                <p>Leveraging cutting-edge technology to modernize the casting process</p>
              </div>
              <div className="value-item">
                <h4>🤝 Collaboration</h4>
                <p>Fostering meaningful partnerships between talent and creators</p>
              </div>
              <div className="value-item">
                <h4>⭐ Quality</h4>
                <p>Maintaining the highest standards in talent discovery and casting</p>
              </div>
              <div className="value-item">
                <h4>🌟 Success</h4>
                <p>Helping actors launch successful careers in the entertainment industry</p>
              </div>
            </div>
            <div className="achievements">
              <h3>Our Achievements</h3>
              <ul>
                <li>🏆 Connected over 10,000+ actors with casting opportunities</li>
                <li>🎯 Successfully cast 500+ projects across Bollywood and regional cinema</li>
                <li>🌍 Expanded to 15+ cities across India</li>
                <li>⭐ 95% actor satisfaction rate with our platform</li>
                <li>🎭 Partnered with 200+ production houses and directors</li>
                <li>📈 300% growth in successful casting placements year-over-year</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
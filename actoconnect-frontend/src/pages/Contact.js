import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <section className="contact-hero">
          <div className="hero-card">
            <h1>Get In Touch</h1>
            <p>Ready to start your journey in Indian cinema? We're here to help.</p>
          </div>
        </section>

        <section className="contact-content">
          <div className="content-card">
            <div className="contact-info">
              <div className="info-card">
                <h3>📧 Email Us</h3>
                <p>support@actoconnect.in</p>
                <p>We respond within 24 hours</p>
              </div>

              <div className="info-card">
                <h3>📞 Call Us</h3>
                <p>+91-90000-12345</p>
                <p>Mon-Fri: 9AM - 6PM IST</p>
              </div>

              <div className="info-card">
                <h3>📍 Visit Us</h3>
                <p>Mumbai Film City</p>
                <p>Goregaon, Mumbai - 400062</p>
                <p>Maharashtra, India</p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="contact-form">
              <h2>Send us a Message</h2>
              <form className="form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input"
                  required
                />
              </div>
              <div className="form-group">
                <select className="input" required>
                  <option value="">Select Category</option>
                  <option value="actor">I'm an Actor</option>
                  <option value="director">I'm a Director</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  className="input"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
          </div>

          <div className="content-card">
            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-grid">
                <div className="faq-item">
                  <h4>How do I create an actor profile?</h4>
                  <p>Sign up as an actor, upload your headshots, portfolio, and complete your profile with skills and experience.</p>
                </div>
                <div className="faq-item">
                  <h4>How much does it cost to post an audition?</h4>
                  <p>Basic audition posts are free. Premium features like featured listings are available at affordable rates.</p>
                </div>
                <div className="faq-item">
                  <h4>How do you verify talent?</h4>
                  <p>We use a combination of portfolio review, skill assessments, and community feedback to ensure quality.</p>
                </div>
                <div className="faq-item">
                  <h4>Can international talent apply?</h4>
                  <p>Yes! We welcome talent from around the world interested in working in Indian cinema.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
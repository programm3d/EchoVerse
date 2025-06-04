import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation triggers
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="logo-section">
          <h1 className="logo-text">EchoVerse</h1>
        </div>
        <div className="nav-actions">
          <button className="nav-btn ghost" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="nav-btn primary"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Audio Diaries</span>
            <br />
            for the Future You
          </h1>
          <p className="hero-subtitle">
            Record your thoughts, memories, and confessions. Set them to unlock
            in the future. Create a digital time capsule of your voice.
          </p>
          <div className="hero-cta">
            <button
              className="cta-btn primary"
              onClick={() => navigate("/signup")}
            >
              Start Your Journey
              <span className="btn-arrow">→</span>
            </button>
            <button
              className="cta-btn secondary"
              onClick={() => navigate("/login")}
            >
              I Have an Account
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <div className="card-icon">🎙️</div>
            <div className="card-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title animate-on-scroll">Why EchoVerse?</h2>
        <div className="features-grid">
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>
              Your audio memories are encrypted and protected. Only you can
              access them.
            </p>
          </div>
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">⏰</div>
            <h3>Time Capsule Mode</h3>
            <p>
              Set your recordings to unlock at a future date. Surprise your
              future self.
            </p>
          </div>
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">😊</div>
            <h3>Mood Tracking</h3>
            <p>
              Tag your entries with emotions. See how your feelings evolve over
              time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta animate-on-scroll">
        <h2>Ready to Start Your Audio Journey?</h2>
        <p>
          Join thousands who are already preserving their voices for tomorrow.
        </p>
        <button className="cta-btn large" onClick={() => navigate("/signup")}>
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2025 Pushan Sinha. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;

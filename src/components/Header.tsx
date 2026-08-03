import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* LOGO */}
      <div className="logo-wrapper">
        <div className="inner">
          <a href="/" aria-label="Home">
            <img src="https://framerusercontent.com/images/VMcS7YYTM5PXfXvlHc9u3hSCMM.svg" alt="" />
          </a>
        </div>
      </div>

      {/* BURGER */}
      <div className="burger-wrapper">
        <div className="inner">
          <button 
            className={`burger-btn ${menuOpen ? 'open' : ''}`}
            id="burger-btn" 
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* MENU PANEL */}
      <div className={`menu-panel ${menuOpen ? 'open' : ''}`} id="menu-panel">
        <nav>
          <a href="#featured-projects" onClick={() => setMenuOpen(false)}>Projects</a>
          {/* <a href="#content-creation" onClick={() => setMenuOpen(false)}>Content</a> */}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Resume</a>
        </nav>
        <div className="menu-contact">
          <a href="mailto:shewalegopal4119@gmail.com" className="menu-email">shewalegopal4119@gmail.com</a>
          <div className="menu-socials">
            {/* <a href="https://instagram.com/gopalshewale41" target="_blank" rel="noopener noreferrer">Instagram</a> */}
            <a href="https://www.linkedin.com/in/gopal-shewale-a182052b5" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/Shewale41" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
        <div style={{ marginTop: '32px' }}>
          <a href="mailto:shewalegopal4119@gmail.com" className="menu-cta-btn" style={{ display: 'inline-flex', textDecoration: 'none' }}>
            <span className="menu-cta-bg"></span>
            <span className="menu-cta-text">Let's talk</span>
            <span className="menu-cta-circle">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

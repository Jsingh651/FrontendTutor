import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import CurriculumWeek from './CurriculumWeek';
import Footer from './Footer';

export default function LandingPage({ isLoggedIn = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  return (
    <div className={`landing-page${menuOpen ? ' menu-opened' : ''}`}>
      <Navbar isLoggedIn={isLoggedIn} onMenuToggle={toggleMenu} />
      <main id="main">
        <section className="hero">
          <h1>Become a Front-End Developer</h1>
          <p>
            Embark on your journey to become a front-end developer and unlock the potential of
            HTML, CSS, JavaScript, and React.
          </p>
        </section>
        <CurriculumWeek />
      </main>
      <Footer />
    </div>
  );
}

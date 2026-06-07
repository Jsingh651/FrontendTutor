import React from 'react';

const LINKS = ['HTML', 'CSS', 'Javascript', 'React'];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        {LINKS.map((link) => (
          <a key={link} href="#" className="footer_link">
            {link}
          </a>
        ))}
      </div>
      <p className="footer__copy">&copy; FrontendTutor</p>
    </footer>
  );
}

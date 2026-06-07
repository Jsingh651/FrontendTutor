import React from 'react';

export default function Navbar({ isLoggedIn, onMenuToggle }) {
  return (
    <header className="header">
      <button className="header__btn_menu" onClick={onMenuToggle} aria-label="Toggle menu">
        <i className="fas fa-bars" />
      </button>
      <nav className="header__nav">
        {isLoggedIn ? (
          <>
            <a href="/profile">Profile</a>
            <a href="/logout">Logout</a>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </nav>
    </header>
  );
}

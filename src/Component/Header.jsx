import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header-container">
      <div className="logo-container">
        <h1 className="logo-text">MyWebsite</h1>
      </div>
      <nav className="nav-menu">
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/about" className="nav-link">
          About
        </a>
        <a href="/pricepage" className="nav-link">
          Services
        </a>
        <a href="/contact" className="nav-link">
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;

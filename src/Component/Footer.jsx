import React from "react";
import "../styles/Footer.css"; // Adjust the import path according to your directory structure

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            We are dedicated to providing the best service and support. Our team
            is here to help you with all your needs.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: test@gmail.com</p>
          <p>Phone: +91 8103719631</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 कृषि साथी | Designed by KC Team
      </div>
    </footer>
  );
};

export default Footer;

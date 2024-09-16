import React from "react";
import "../styles/AboutPage.css"; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are dedicated to providing up-to-date prices
        of crops in every marketplace. Our mission is to help farmers, traders,
        and consumers make informed decisions by offering real-time price
        information across various regions.
      </p>

      <h2>What We Do</h2>
      <p>
        Our platform gathers and displays crop prices from different
        marketplaces, ensuring that you have the latest and most accurate data
        at your fingertips. Whether you are a farmer looking to sell your
        produce or a buyer seeking the best deals, our website is designed to
        meet your needs.
      </p>

      <h2>Website Development Services</h2>
      <p>
        In addition to providing crop price information, we also offer
        professional website development services. Our team specializes in
        creating custom websites tailored to your business needs. From
        e-commerce platforms to informative blogs, we deliver solutions that
        help you grow your online presence.
      </p>

      <p>
        If you're interested in our website development services or have any
        questions about our crop price platform, feel free to{" "}
        <a href="/contact">contact us</a>. We're here to help!
      </p>
    </div>
  );
};

export default About;

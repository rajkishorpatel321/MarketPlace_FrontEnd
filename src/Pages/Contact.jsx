import React, { useState } from "react";
import "../styles/ContactPage.css"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "Your Name",
    phone: "phone no",
    message: "N.A.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Reset the form
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        If you have any questions about our services, please don't hesitate to
        reach out. Fill out the form below, and we'll get back to you as soon as
        possible.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;

// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-cols">
        {/* Column 1 - About */}
        <div>
          <h3>About Us</h3>
          <p>
            Welcome to our hotel! We provide the best rooms, amenities, and
            services to make your stay unforgettable.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/testimonial">Testimonials</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 - Services */}
        <div>
          <h3>Services</h3>
          <ul>
            <li>Free WiFi</li>
            <li>24/7 Support</li>
            <li>Spa & Wellness</li>
            <li>Restaurant</li>
          </ul>
        </div>

        {/* Column 4 - Follow Us */}
        <div>
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

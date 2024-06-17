// src/components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <p>
            <a href="mailto:brian.worrell@boston.gov">brian.worrell@boston.gov</a>
            <a href="tel:+16176353131">+1 617-635-3131</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 District 4. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

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
            <a href="https://www.google.com/maps/dir//5+Erie+St,+Dorchester,+MA+02121/@42.3266068,-71.1355474,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89e37bc15204b3e5:0x4e18ab632ba37f9e!2m2!1d-71.0788007!2d42.303259?entry=ttu">District office: 5 Erie St, Dorchester, MA 02121</a>
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

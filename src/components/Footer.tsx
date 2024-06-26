import React from 'react';
import { useEffect, useState } from "react";
import { ContactInfoTable } from "../interfaces";

const Footer = () => {
  const [contactInfo, setContactInfo] = React.useState<ContactInfoTable>();

  React.useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('https://pitne-d4-app-strapi-production.up.railway.app/api/contact-infos', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setContactInfo(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching associations from Strapi:', error);
      }
    };
    fetchContactInfo();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content" style={{ padding: '0 15px' }}>
        <div className="footer-section about">
          <p style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white', margin: '5px 0' }}>
            <a href={`mailto:${contactInfo?.attributes.Email}`} style={{ color: 'white', fontWeight: "450", fontSize: '14px' }}>Mail To: {contactInfo?.attributes.Email}</a>
          </p>
          <p style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white', margin: '5px 0' }}>
            <a href={`tel:+1${contactInfo?.attributes.Email}`} style={{ color: 'white', fontWeight: "450", fontSize: '14px' }}>Call: +1 {contactInfo?.attributes.PhoneNumber}</a>
          </p>
          <p className='mb-3' style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white', margin: '5px 0', marginBottom: '10px' }}>
            {contactInfo?.attributes.Address && (
              <a href={`https://www.google.com/maps/dir//${encodeURIComponent(contactInfo.attributes.Address)} ?entry=ttu`} style={{ color: 'white', fontWeight: "450", fontSize: '14px' }}>
                District office: {contactInfo?.attributes.Address}
              </a>
            )}
          </p>
        </div>
      </div >
      <div className="footer-bottom">
        &copy; 2024 District 4. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

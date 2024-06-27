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
  <div className="footer-content">
    <div className="footer-section about">
      <p>
        Mail To:<span className="underline-link"><a href={`mailto:${contactInfo?.attributes.Email ?? ''}`}>{contactInfo?.attributes.Email}</a></span>
      </p>
      <p>
        Call:<span className="underline-link"><a href={`tel:+1${contactInfo?.attributes.PhoneNumber ?? ''}`}>+1 {contactInfo?.attributes.PhoneNumber}</a></span>
      </p>
      {contactInfo?.attributes.Address && (
        <p>
          District office:<span className="underline-link"><a href={`https://www.google.com/maps/dir//${encodeURIComponent(contactInfo.attributes.Address)}?entry=ttu`}>{contactInfo.attributes.Address}</a></span>
        </p>
      )}
    </div>
  </div>
  <div className="footer-bottom">
    &copy; 2024 District 4. All rights reserved.
  </div>
</footer>


  );
};

export default Footer;

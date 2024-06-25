import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AngleLeftIcon } from '@patternfly/react-icons';
import NavBar from "../components/navbar/NavBar";
import { Button } from "@patternfly/react-core";

// This component represents the header with the back navigation
function Header() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <NavBar />
      <div className="mt-4 ms-4 portal-nav">
        <AngleLeftIcon size="md" onClick={() => navigate("/311Forms")} />
        Download the App here
      </div>
    </div>
  );
}

function DownloadApp() {
  const [appStoreLink, setAppStoreLink] = useState('');
  const [playStoreLink, setPlayStoreLink] = useState('');

  React.useEffect(() => {
    // Mocked URLs for the App Store and Play Store
    setAppStoreLink('https://apps.apple.com/us/app/bos-311/id330894558');
    setPlayStoreLink('https://play.google.com/store/apps/details?id=gov.cityofboston.citizensconnect');
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="my-3 pf-c-title heading text-start">
        The Boston 311 app helps residents and visitors improve City neighborhoods. You can report non-emergency issues, like potholes and graffiti.
      </div>
      <div className="grid-container">
        <div className="grid-item" onClick={() => window.open(appStoreLink, "_blank")}>
          <img src="/path-to-app-store-icon.png" alt="Available on the App Store" />
          <p>Available on the App Store</p>
        </div>
        <div className="grid-item" onClick={() => window.open(playStoreLink, "_blank")}>
          <img src="/path-to-play-store-icon.png" alt="Available on the Play Store" />
          <p>Available on the Play Store</p>
        </div>
      </div>
    </div>
  );
}

export default DownloadApp;

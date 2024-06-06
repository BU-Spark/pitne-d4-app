import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AngleLeftIcon } from '@patternfly/react-icons';
import LogoBar from "../components/home/LogoBar";
import { Button } from "@patternfly/react-core";

// This component represents the header with the back navigation
function Header() {
    const navigate = useNavigate();
    return (
      <div className="container">
          <LogoBar />
          <div className="mt-4 ms-4 portal-nav">
              <AngleLeftIcon size="md" onClick={() => navigate("/home")}/>
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
      <div className="my-3 pf-c-title heading text-start">The Boston 311 app helps residents and visitors improve City neighborhoods. You can report non-emergency issues, like potholes and graffiti.</div>
        <div className="download-links">

        <Button className="px-3 py-2 mb-2 app-download-button" 
            variant="primary" 
            onClick={() => window.open(appStoreLink, "_blank")}>
            Available on the App Store
        </Button>

        <Button className="px-3 py-2 mb-2 app-download-button" 
            variant="primary" 
            onClick={() => window.open(playStoreLink, "_blank")}>
            Available on the Play Store
        </Button>
        </div>
    </div>
  );
}

export default DownloadApp;

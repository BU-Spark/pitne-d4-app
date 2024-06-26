import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AngleLeftIcon } from '@patternfly/react-icons';
import NavBar from "../components/navbar/NavBar";
import appstore from "../images/AppStore.png"
import playstore from "../images/PlayStore.png"

// This component represents the header with the back navigation

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
      <NavBar />
      <div className="content-wrapper" style={{ paddingTop: '70px' }}>
        <div className="top-heading">Download the App</div>
        <div className="grid-container">
          <div className="grid-item" onClick={() => window.open(appStoreLink, "_blank")}>
          <div className='p-4'>
            <img src={appstore} alt="Councilor" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
            <p>Available on the App Store</p>
          </div>
          <div className="grid-item" onClick={() => window.open(playStoreLink, "_blank")}>
          <div className='p-4'>
            <img src={playstore} alt="Councilor" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
            <p>Available on the Play Store</p>
          </div>
        </div>
      </div>
    </div>
  );  
}


export default DownloadApp;

import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import LogoBar from "../components/home/LogoBar";
import { AngleLeftIcon } from "@patternfly/react-icons";
import Footer from "../components/home/footer";
import Call from "../images/callIcon.png"
import Online from "../images/onlineIcon.png"
import Tweet from "../images/tweetIcon.png"
import App from "../images/appIcon.png"

function NonEmergencyForms() {
  const navigate = useNavigate();

  const handleCall = () => {
    window.location.href = 'tel:311';
  };

  const handleTweet = () => {
    window.open('https://twitter.com/BOS311', '_blank');
  }

  const reportOnline = () => {
    window.open('https://www.boston.gov/departments/boston-311#online-services', '_blank')
  }

  return (
    <div>
    <div className="page-container">
    <div className="content-wrap">
      <div className = "mb-5"></div>
      <LogoBar />
      <div className="top-heading">REPORT A NON-EMERGENCY ISSUE</div>
      <div className="grid-container">
        <div className="grid-item" onClick={handleCall}>
        <div className='p-4'>
                <img src={Call} alt="Call image" />
              </div>
          <p>CALL 311</p>
        </div>
        <div className="grid-item" onClick={() => navigate('/DownloadApp')}>
        <div className='p-4'>
                <img src={App} alt="App image" />
              </div>
          <p>Download the App</p>
        </div>
        <div className="grid-item" onClick={handleTweet}>
        <div className='p-4'>
                <img src={Tweet} alt="Tweet image" />
              </div>
          <p>Tweet @BOS311</p>
        </div>
        <div className="grid-item" onClick={reportOnline}>
        <div className='p-4'>
                <img src={Online} alt="Online image" />
              </div>
          <p>File a Report Online</p>
        </div>
      </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default NonEmergencyForms;

import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import LogoBar from "../components/home/LogoBar";
import { AngleLeftIcon } from "@patternfly/react-icons";

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
    <div className="container">
      <LogoBar />
      <div className="mt-4 ms-4 portal-nav">
        <AngleLeftIcon size="md" onClick={() => navigate("/")} />
        Report a Non-Emergency Issue
      </div>
      <div className="mt-4 my-3 pf-c-title heading text-start">Report a Non-Emergency Issue</div>
      <div className="grid-container">
        <div className="grid-item" onClick={handleCall}>
          <img src="/path-to-phone-icon.png" alt="Call 311" />
          <p>CALL 311</p>
        </div>
        <div className="grid-item" onClick={() => navigate('/DownloadApp')}>
          <img src="/Users/sowrathisomasundaram/pitne-d4-app/src/screens/appPhoto.png" alt="Download the App" />
          <p>Download the App</p>
        </div>
        <div className="grid-item" onClick={handleTweet}>
          <img src="/path-to-twitter-icon.png" alt="Tweet @BOS311" />
          <p>Tweet @BOS311</p>
        </div>
        <div className="grid-item" onClick={reportOnline}>
          <img src="/path-to-report-icon.png" alt="File a Report Online" />
          <p>File a Report Online</p>
        </div>
      </div>
    </div>
  );
}

export default NonEmergencyForms;

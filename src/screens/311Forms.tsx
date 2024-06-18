import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import LogoBar from "../components/home/LogoBar";
import { AngleLeftIcon } from "@patternfly/react-icons";
import Footer from "../components/home/footer";

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
    <div className="page-container">
    <div className="content-wrap">
      <div className = "mb-5"></div>
      <LogoBar />
      <div className="top-heading">Report a Non-Emergency Issue</div>
      <div className="grid-container">
        <div className="grid-item" onClick={handleCall}>
          <img src="./images/callPhoto.png" alt="Call 311" />
          <p>CALL 311</p>
        </div>
        <div className="grid-item" onClick={() => navigate('/DownloadApp')}>
          <img src="./images/appPhoto.png" alt="Download the App" />
          <p>Download the App</p>
        </div>
        <div className="grid-item" onClick={handleTweet}>
          <img src="./images/tweetPhoto.png" alt="Tweet @BOS311" />
          <p>Tweet @BOS311</p>
        </div>
        <div className="grid-item" onClick={reportOnline}>
          <img src="./images/OnlinePhoto.png" alt="File a Report Online" />
          <p>File a Report Online</p>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default NonEmergencyForms;

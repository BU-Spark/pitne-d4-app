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
      <Button
        className="home-button px-3 py-2 mb-2"
        variant="primary"
        onClick={handleCall}
      >
        Call 311
      </Button>
      <Button
        className="home-button px-3 py-2 mb-2"
        variant="primary"
        onClick={() => navigate('/DownloadApp')}
      >
        Download the App
      </Button>
      <Button
        className="home-button px-3 py-2 mb-2"
        variant="primary"
        onClick={handleTweet}
      >
        Tweet @BOS311
      </Button>
      <Button
        className="home-button px-3 py-2 mb-2"
        variant="primary"
        onClick={reportOnline}
      >
        File a Report Online
      </Button>
    </div>
  );
}

export default NonEmergencyForms;

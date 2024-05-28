import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  
  const navigateToNext = () => {
    navigate('/login');
  };

  const navigateToSignUp = () => {
    navigate('/address-info');
  };
  
    return (
      <div className="container-padded">
        <div className="mb-5 pb-5 welcome-title">Welcome to the District 4 Boston Citizen’s App</div>
        <div className="mt-5 pt-5 h6 mb-2"> Please confirm you are a resident of District 4 </div>
        <Button onClick={navigateToNext} className="px-5 py-1 mb-2"variant="primary">
        I am a resident of D4
        </Button>
        <Button onClick={navigateToSignUp} className="px-5 py-1" variant="secondary">
        Find out
        </Button>
      </div>
    );
  
}

export default Welcome;
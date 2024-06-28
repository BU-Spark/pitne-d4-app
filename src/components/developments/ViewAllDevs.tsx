import React from 'react';
import { Button } from '@patternfly/react-core';
import { useNavigate } from 'react-router-dom';

function ViewAllDevs() {
  const navigate = useNavigate();

  const goToAllDevelopments = () => {
    navigate('/all-developments');
  };

  return (
    <Button
      className="home-button px-3 py-2 mb-2"
      variant="primary"
      onClick={goToAllDevelopments}
    >
      View All Developments
    </Button>
  );
}

export default ViewAllDevs;
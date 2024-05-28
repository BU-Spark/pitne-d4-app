import * as React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from 'react-router-dom';

function AddressInfo() {
  const navigate = useNavigate();

  const navigateToNext = () => {
    navigate('/address-entry');
  };

  return (
    <div className="container-padded">
      <div className="text-start mb-3 pf-c-title h5">Please enter your address to confirm your residency</div>
      <div className="text-start mb-5 pb-5"> We don’t store any of this information, but we need to use it to match you to the resources for your residence. </div>
      <div className="text-end pt-5 mt-5">
        <Button onClick={navigateToNext} className="px-3 py-1" variant="primary">
          Next
        </Button>
      </div>
      
      
    </div>
  );
  
}

export default AddressInfo
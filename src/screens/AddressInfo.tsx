import * as React from 'react';
import { Button } from '@patternfly/react-core';
import ProgressBar from '../components/home/Progressbar'; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";

function AddressInfo() {
  const navigate = useNavigate();
  const navigateToNext = () => {
    // Handle navigation to the next page
    navigate("/address-entry");
  };

  const handleSkip = () => {
    // Handle skipping this step
    navigate("/civic-associations");
  };

  return (
    // TODO Navbar

    <div className='p-4 m-3' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Heading */}
      <div>
        <h1>Address Entry</h1>
      </div>

      {/* Text */}
      <div>
        <p>If you want to be matched to a civic association according to your residence, please click Next and enter the information. (You can skip directly to look at information of all the associations in District 4).</p>
      </div>

      <div>
        {/* Next Button */}
        <div className='p-2'>
          <Button
            onClick={navigateToNext}
            className="px-5 py-1"
            variant="primary"
          >
            Next
          </Button>
        </div>

        {/* Skip Button */}
        <div className='p-2'>
          <Button
            onClick={handleSkip}
            className="px-5 py-1"
            variant="secondary"
          >
            Skip
          </Button>
        </div>

        {/* Progress Bar */}
        <div className='bottom-0 start-0 p-5' style={{ width: '100%' }}>
          <ProgressBar value={33} />
        </div>

      </div>

    </div>
  );
}

export default AddressInfo;

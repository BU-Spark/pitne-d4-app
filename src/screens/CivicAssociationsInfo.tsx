
import * as React from 'react';
import { Button } from '@patternfly/react-core';
import ProgressBar from '../components/home/Progressbar'; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import associationsImage from "../images/associations.png";
import LogoBar from "../components/home/LogoBar";

function CivicAssociationsInfo() {
    const navigate = useNavigate();
    const navigateToNext = () => {
        // Handle navigation to the next page
        navigate("/address-info");
    };

    return (
        <div className='p-4 m-3' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="mb-5">
                <LogoBar />
            </div>

            {/* Heading */}
            <div className='mt-3'>
                <h2><b>What are Civic Associations?</b></h2>
            </div>

            {/* Text */}
            <div className='mt-5'>
                <p>
                    Civic associations serve as vital hubs for local engagement and collective action. These grassroots organizations are driven by residents who come together to address shared concerns and improve the quality of life in their neighborhoods. By fostering collaboration on issues ranging from public safety to environmental sustainability, civic associations empower residents to take an active role in shaping the future of their communities.</p>

                <p>Through their advocacy efforts and community-building initiatives, civic associations play a crucial role in enhancing neighborhood cohesion and resilience. By organizing events, facilitating communication channels, and advocating for equitable policies, these organizations create spaces where residents can connect, collaborate, and collectively address challenges. In doing so, they cultivate a sense of belonging and civic pride, driving positive change and fostering a vibrant sense of community.</p>
            </div>

            <div>
                {/* Next Button */}
                <div className='p-2 mt-3'>
                    <Button
                        onClick={navigateToNext}
                        className="px-5 py-1"
                        variant="primary"
                    >
                        Next
                    </Button>
                </div>

                {/* Progress Bar */}
                <div className='bottom-0 start-0 p-5' style={{ width: '100%' }}>
                    <ProgressBar value={25} />
                </div>

            </div>

        </div>
    );
}

export default CivicAssociationsInfo;

import React, { useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import ClientImage from '../images/councilor_photo.png'; // Import the image
import Footer from '../components/Footer'; // Import the Footer component

const CouncilorInfo: React.FC = () => {

  const [councilorName, setCouncilorName] = useState('');
  const [councilorDescription, setCouncilorDescription] = useState('');

  React.useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch('https://pitne-d4-app-strapi-production.up.railway.app/api/councilor-infos', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setCouncilorName(data.data[0].attributes.Name);
          setCouncilorDescription(data.data[0].attributes.Info);
        }
      } catch (error) {
        console.error('Error fetching associations from Strapi:', error);
      }
    };
    fetchAddress();
  }, []);


  return (
    <div>
      <div className="page-container">
        <div className="content-wrap">
          <div className="mb-5">
            <NavBar />
          </div>
          <div className="top-heading" style={{ fontSize: '28px' }}>About the Councilor</div>
          <div className='p-4'>
            <img src={ClientImage} alt="Client image" />
          </div>
          <div className='left-align'> {/* Apply the left-align class here */}
            <p> {councilorDescription}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CouncilorInfo;

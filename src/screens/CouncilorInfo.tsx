import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar/NavBar';
import ClientImage from '../images/councilor_photo.png'; // Import the image
import Footer from '../components/Footer'; // Import the Footer component
import { set } from 'date-fns';

const CouncilorInfo: React.FC = () => {

  const [councilorName, setCouncilorName] = useState('');
  const [councilorDescription, setCouncilorDescription] = useState('');
  const [consilorImage, setConsilorImage] = useState('');

  useEffect(() => {
    const fetchCouncilorInfo = async () => {
      try {
        const response = await fetch('https://pitne-d4-app-strapi-production.up.railway.app/api/councilor-infos?populate=*', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(`https://pitne-d4-app-strapi-production.up.railway.app`+ data.data[0].attributes.CouncilorImage.data.attributes.url);
          setCouncilorName(data.data[0].attributes.Name);
          setCouncilorDescription(data.data[0].attributes.Info);
          setConsilorImage(`https://pitne-d4-app-strapi-production.up.railway.app${data.data[0].attributes.CouncilorImage.data.attributes.url}`);
        }
      } catch (error) {
        console.error('Error fetching councilor info from Strapi:', error);
      }
    };
    fetchCouncilorInfo();
  }, []);

  // Function to handle new lines in the description
  const formatDescription = (description: string) => {
    return description.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  };

  return (
    <div>
      <div className="page-container">
        <div className="content-wrap">
          <div className="mb-5">
            <NavBar />
          </div>
          <div className="top-heading" style={{ fontSize: '28px' }}>About the Councilor</div>
          <div className='p-4'>
            <img src={consilorImage} alt="Councilor" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div className='left-align'> {/* Apply the left-align class here */}
            <h2><b>{councilorName}</b></h2> {/* Display the councilor's name */}
            <p dangerouslySetInnerHTML={{ __html: formatDescription(councilorDescription) }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CouncilorInfo;





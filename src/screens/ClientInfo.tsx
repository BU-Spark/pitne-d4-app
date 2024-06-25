import React from 'react';
import NavBar from '../components/navbar/NavBar';
import ClientImage from '../images/councilor_photo.png'; // Import the image
import Footer from '../components/Footer'; // Import the Footer component

const ClientInfo: React.FC = () => {
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
            <p>
              Brian Worrell is the Boston City Councilor for District 4, which includes Mattapan, Dorchester, and parts of Jamaica Plain and Roslindale. A native Bostonian, Brian was raised by parents who migrated to the United States from Jamaica and Barbados in search of the American dream. Through his parents' hard work, determination, and belief in their community, Brian was given access to opportunity in Boston. He graduated from METCO and earned a bachelor’s degree at Northeastern University, majoring in accounting and entrepreneurship, and eventually becoming the proud owner of a Boston-based business.
            </p>
            <p>
              As a small business owner who helped dozens of first-time homebuyers realize the goal of homeownership, Brian learned the ins and outs of city government. Over the last 16 years, he has coordinated several community events – such as cookouts, concerts, professional networking events, youth basketball tournaments, backpack drives, free haircuts at a local barbershop in Dorchester, and coordinated a COVID vaccine clinic – all to bring together our intergenerational, diverse district. Since taking office, he’s continued this commitment to the community, launching a Thanksgiving turkey giveaway and Holiday Toy Drive that each supported hundreds of District 4 families.
            </p>
            <p>
              Brian ran for the Council to address the challenges facing the district and leverage his knowledge of and experiences with city government to contribute to building and strengthening our community. He is looking forward to working in partnership with the Mayor, colleagues in City Council, and across city departments to implement strategies aimed at eliminating these disparities and making District 4 a community where everyone and anyone can thrive.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientInfo;

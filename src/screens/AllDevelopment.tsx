// import React, { useEffect, useState } from "react";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { AngleLeftIcon } from "@patternfly/react-icons";
// import LogoBar from "../components/home/LogoBar";
// import DevelopmentUpdates from "../components/home/Developments/Development"; // Assuming you have this component
// import Footer from "../components/home/footer";

// // Define the data type for the development entries
// type DevelopmentData = {
//   id: string;
//   attributes: {
//     title: string;
//     body: string;
//     website?: string;
//     date?: string;
//   };
// };

// function AllDevelopments() {
//   const navigate = useNavigate();
//   const db = getFirestore();
//   const [developments, setDevelopments] = useState<DevelopmentData[]>([]);

//   useEffect(() => {
//     const fetchDevelopments = async () => {
//       try {
//         const developmentsCollection = collection(db, "Developments");
//         const snapshot = await getDocs(developmentsCollection);
//         const loadedDevelopments = snapshot.docs.map(doc => ({
//           id: doc.id,
//           attributes: {
//             title: doc.data().attributes.title,
//             body: doc.data().attributes.body,
//             website: doc.data().attributes.website,
//             date: doc.data().attributes.date
//           }
//         })) as DevelopmentData[];
//         setDevelopments(loadedDevelopments);
//       } catch (error) {
//         console.error("Failed to fetch developments:", error);
//         setDevelopments([{
//           id: '-1',
//           attributes: {
//             title: "Uh Oh!",
//             body: "Looks like there was an issue!",
//             website: "#",
//             date: ""
//           }
//         }]);
//       }
//     };

//     fetchDevelopments();
//   }, [db]);

//   return (
//     <div className="page-container">
//       <div className="content-wrap">
//         <div className="mb-5">
//           <LogoBar />
//         </div>
//         <div className="top-heading">All Developments</div>
//         <DevelopmentUpdates developments={developments} vertical={true}/>
//       </div>
//       <Footer />
//     </div>
    
//   );
// }

// export default AllDevelopments;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoBar from "../components/home/LogoBar";
import Footer from "../components/home/footer";
import DetailedDevelopmentCard from "../components/home/Developments/detailedDevs";

type DevelopmentData = {
  id: string;
  attributes: {
    title: string;
    body: string;
    website?: string;
    date?: string;
  };
};

const AllDevelopments: React.FC = () => {
  const navigate = useNavigate();
  const [developments, setDevelopments] = useState<DevelopmentData[]>([]);

  const fetchDevelopments = async () => {
    try {
      const response = await fetch("https://pitne-d4-app-strapi-production.up.railway.app/api/developments?populate=*");
      
      console.log("Response:", response);
      
      if (response.ok) {
        const json = await response.json();
        
        console.log("JSON Data:", json);
        
        const fetchedDevelopments = json.data.map((item: any) => {
          let formattedDate = "";
          if (item.attributes.Date) {
            const dateObj = new Date(item.attributes.Date);
            formattedDate = dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          }

          return {
            id: item.id,
            attributes: {
              title: item.attributes.Title,
              body: item.attributes.Description,
              website: item.attributes.Link,
              date: formattedDate,
            },
          };
        });

        console.log("Fetched Developments:", fetchedDevelopments);

        setDevelopments(fetchedDevelopments);
      } 
      else {
        console.log(`Status code: ${response.status}`);

        setDevelopments([{
          id: '-1',
          attributes: {
            title: "Uh Oh!",
            body: "Looks like there was an issue!",
            website: "#",
            date: ""
          }
        }]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);

      setDevelopments([{
        id: '-1',
        attributes: {
          title: "Uh Oh!",
          body: "Looks like there was an issue!",
          website: "#",
          date: ""
        }
      }]);
    }
  };

  useEffect(() => {
    fetchDevelopments();
  }, []);

  return (
    <div>
      <div className="page-container">
        <div className="content-wrap">
          <div className="mb-5">
            <LogoBar />
          </div>
          <h2 className="top-heading">ALL DEVELOPMENTS</h2>
          <div className="detailed-developments-container">
            {developments.map(development => (
              <DetailedDevelopmentCard
                key={development.id}
                title={development.attributes.title}
                body={development.attributes.body}
                website={development.attributes.website}
                date={development.attributes.date}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllDevelopments;

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
import { AngleLeftIcon } from "@patternfly/react-icons";
import axios from "axios";
import LogoBar from "../components/home/LogoBar";
import DevelopmentUpdates from "../components/home/Developments/Development"; // Assuming you have this component
import Footer from "../components/home/footer";

// Define the data type for the development entries
type DevelopmentData = {
  id: string;
  attributes: {
    title: string;
    body: string;
    website?: string;
    date?: string;
    image?: string;
  };
};

function AllDevelopments() {
  const navigate = useNavigate();
  const [developments, setDevelopments] = useState<DevelopmentData[]>([]);

  const fetchDevelopments = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("http://pitne-d4-app-strapi-production.up.railway.app/api/developments?populate=*");
      const fetchedDevelopments = data.map((item: any) => ({
        id: item.id,
        attributes: {
          title: item.attributes.title,
          body: item.attributes.body,
          website: item.attributes.website,
          date: item.attributes.date,
          image: item.attributes.image?.data && item.attributes.image.data.length > 0
            ? "http://pitne-d4-app-strapi-production.up.railway.app" + item.attributes.image.data[0].attributes.url
            : '',
        },
      }));
      setDevelopments(fetchedDevelopments);
    } catch (error) {
      console.error("Failed to fetch developments:", error);
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
    <div className="page-container">
      <div className="content-wrap">
        <div className="mb-5">
          <LogoBar />
        </div>
        <div className = "grab-cursor">
            <AngleLeftIcon size="md" onClick={() => navigate("/")}/>
          </div>
        <div className="top-heading">All Developments</div>
        <DevelopmentUpdates developments={developments} vertical={true}/>
      </div>
      <Footer />
    </div>
  );
}

export default AllDevelopments;
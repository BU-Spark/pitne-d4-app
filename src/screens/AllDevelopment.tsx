import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AngleLeftIcon } from "@patternfly/react-icons";
import LogoBar from "../components/home/LogoBar";
import DevelopmentUpdates from "../components/home/Developments/Development"; // Assuming you have this component

// Define the data type for the development entries
type DevelopmentData = {
  id: string;
  attributes: {
    title: string;
    body: string;
    website?: string;
    date?: string;
  };
};

function AllDevelopments() {
  const navigate = useNavigate();
  const db = getFirestore();
  const [developments, setDevelopments] = useState<DevelopmentData[]>([]);

  useEffect(() => {
    const fetchDevelopments = async () => {
      try {
        const developmentsCollection = collection(db, "Developments");
        const snapshot = await getDocs(developmentsCollection);
        const loadedDevelopments = snapshot.docs.map(doc => ({
          id: doc.id,
          attributes: {
            title: doc.data().attributes.title,
            body: doc.data().attributes.body,
            website: doc.data().attributes.website,
            date: doc.data().attributes.date
          }
        })) as DevelopmentData[];
        setDevelopments(loadedDevelopments);
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

    fetchDevelopments();
  }, [db]);

  return (
    <div className="container">
      <LogoBar />
      <div className="mt-4 ms-4 portal-nav">
        <AngleLeftIcon size="md" onClick={() => navigate("/")} />
        All Developments
      </div>
      <DevelopmentUpdates developments={developments} vertical={true} />
    </div>
  );
}

export default AllDevelopments;

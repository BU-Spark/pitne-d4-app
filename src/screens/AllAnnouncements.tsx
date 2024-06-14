import React, { useEffect } from "react";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";
import type { announData } from "./Home";
import { APIUrl } from "./Home";
import LogoBar from "../components/home/LogoBar";
import Announcements from "../components/home/announcements/Announcement";
import { doc, getDoc, getFirestore, collection, getDocs} from "firebase/firestore";
import axios from "axios";

function AllAnnouncements() {
  const db = getFirestore();
  const navigate = useNavigate();

  const [announcements, setAnnounData] = React.useState<announData[]>([]);

  // const fetchEvents = async () => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axios.get("http://localhost:1337/api/announcements");
  //     const fetchedAnnouns = data.map((item: any) => ({
  //       id: item.id,
  //       attributes: {
  //         title: item.attributes.Title,
  //         description: item.attributes.Description,
  //         date: item.Date,
  //       }, 
  //     }));
  //     console.log(fetchedAnnouns);

  //     setAnnounData(fetchedAnnouns);
  //   } catch (error) {
  //     console.error('Fetching events failed:', error);
  //   }
  // };

  useEffect(() => {
    const fetchAnnounData = async () => {
      try {
        const announsCollection = collection(db, "announcements");
    
        const announSnapshot = await getDocs(announsCollection);
        const announList = announSnapshot.docs.map(doc => ({
          // id: doc.id,
          ...doc.data()
        })) as announData[];
        setAnnounData(announList);
      } catch (error) {
        console.log(error);
      }

    };
    fetchAnnounData();
  }, []);

  
  return (
    <div className="container">
      <div className = "mb-5">
      <LogoBar />
      </div>
      {/* <div className="mt-4 ms-4 portal-nav">
        <div className = "grab-cursor">
        <AngleLeftIcon size="md" onClick={() => navigate("/")} />
        </div>
      </div> */}
      <div className="top-heading">All Announcements</div>
      <Announcements announs={announcements} vertical={true}/>
    </div>
  );
}

export default AllAnnouncements;
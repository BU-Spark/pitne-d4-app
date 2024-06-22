import React, { useEffect } from "react";
import type { announData } from "./Home";
import LogoBar from "../components/home/LogoBar";
import Announcements from "../components/home/announcements/Announcement";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import Footer from "../components/home/footer";

function AllAnnouncements() {
  const db = getFirestore();

  const [announcements, setAnnounData] = React.useState<announData[]>([]);

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
    <div className="page-container">
      <div className="content-wrap">
        <div className="mb-5">
          <LogoBar />
        </div>
        <div className="top-heading">All Announcements</div>
        <div className = "announcements">
          <Announcements announs={announcements} vertical={true} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllAnnouncements;
import React, { useEffect } from "react";
import type { announData } from "./Home";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Footer from "../components/Footer";
import DetailedAnnouncementCard from "../components/announcements/DetailedAnnouncements";
import NavBar from "../components/navbar/NavBar";

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
    <div>
      <div className="page-container">
        <div className="content-wrap">
          <div className="mb-5">
            <NavBar />
          </div>
          <div className="top-heading">All Announcements</div>
          <div className="detailed-announcements-container">
            {announcements.map(announcement => (
              <DetailedAnnouncementCard
                key={announcement.id} // Ensures each card is uniquely identified
                title={announcement.attributes.title}
                body={announcement.attributes.description}
                date={announcement.attributes.date}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllAnnouncements;
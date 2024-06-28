import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar/NavBar";
import DetailedAnnouncementCard from "../components/announcements/DetailedAnnouncements";
import Footer from "../components/Footer";
import type { announData } from "./Home";

const AllAnnouncements: React.FC = () => {
  const [announcements, setAnnounData] = useState<announData[]>([]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("https://pitne-d4-app-strapi-production.up.railway.app/api/announcements?populate=*");

      if (response.ok) {
        const json = await response.json();

        const fetchedAnnouncements = json.data.map((item: any) => {
          const dateObj = new Date(item.attributes.Date);
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          return {
            id: item.id,
            attributes: {
              title: item.attributes.Title,
              description: item.attributes.Description,
              date: formattedDate,
            },
          };
        });

        setAnnounData(fetchedAnnouncements);
      } else {

        setAnnounData([
          {
            id: -1,
            attributes: {
              title: "Uh Oh!",
              description: "Looks like there was an issue!",
              date: '',
            },
          },
        ]);
      }
    } catch (error) {
      // Log any error that occurred during the fetch
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <div className="page-container">
        <div className="content-wrap">
          <div className="mb-5">
            <NavBar />
          </div>
          <div className="top-heading">ALL ANNOUNCEMENTS</div>
          <div className="detailed-announcements-container">
            {announcements.map((announcement) => (
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

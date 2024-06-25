import React, { useEffect, useState } from "react";
import LogoBar from "../components/home/LogoBar";
import DetailedAnnouncementCard from "../components/home/announcements/detailedAnnouncements";
import Footer from "../components/home/footer";
import type { announData } from "./Home";

const AllAnnouncements: React.FC = () => {
  const [announcements, setAnnounData] = useState<announData[]>([]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("https://pitne-d4-app-strapi-production.up.railway.app/api/announcements?populate=*");

      // Log the response object to inspect it
      console.log("Response:", response);

      if (response.ok) {
        const json = await response.json();

        // Log the parsed JSON data
        console.log("JSON Data:", json);

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

        // Log the transformed announcements data
        console.log("Fetched Announcements:", fetchedAnnouncements);

        setAnnounData(fetchedAnnouncements);
      } else {
        console.log(`Status code: ${response.status}`);

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
            <LogoBar />
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

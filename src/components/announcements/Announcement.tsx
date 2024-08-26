import * as React from "react";
import { useEffect, useState } from "react";
import AnnouncementCard from "./AnnouncementCard";
import type { announData } from "../../screens/Home";

function Announcement(props: { vertical: boolean }) {
  const [announcements, setAnnouncements] = useState<announData[]>([]);

  const fetchAnnouncementTitles = async () => {
    try {
      const response = await fetch("https://pitne-d4-app-strapi-production.up.railway.app/api/announcements?populate=*");

      if (response.ok) {
        const json = await response.json();
        const fetchedAnnouncements = json.data.map((item: any) => ({
          id: item.id,
          attributes: {
            title: item.attributes.Title,
            description: item.attributes.Description,
            date: item.attributes.Date
          }
        }));
        setAnnouncements(fetchedAnnouncements);
      } else {
        console.error(`Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncementTitles();
  }, []);

  return (
    <div className={props.vertical ? "vertical-scroll" : "horizontal-scroll"} style={props.vertical ? { display: "flex", flexWrap: "wrap" } : { marginLeft: 15 }}>
      {announcements.length > 0 ? (
        announcements.slice().reverse().map((announcement) => {
          return (
            <AnnouncementCard
              key={announcement.id} // Ensures each card is uniquely identified
              title={announcement.attributes.title}
              description={announcement.attributes.description}
              date={announcement.attributes.date}
            ></AnnouncementCard>
          );
        })
      ) : (
        <AnnouncementCard
          title="No Announcements"
          description="Check back later!"
        ></AnnouncementCard>
      )}
    </div>
  );
}

export default Announcement;

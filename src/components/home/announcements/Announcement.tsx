import * as React from "react";
import AnnouncementCard from "./AnnouncementCard.tsx";
import type { tweetData } from "../../../screens/Home.tsx";

function Announcement(props: { announs: announData[]; vertical: boolean }) {
  return (
    <div className={props.vertical ? "vertical-scroll" : "horizontal-scroll"}
      style={
        props.vertical ? { display: "flex", flexWrap: "wrap" } : {}
      }>
      {props.announs.length > 0 ? (
        props.announs.slice().reverse().map((announcement) => {
          return (
            <AnnouncementCard
              key={announcement.attributes.date} // Assuming 'date' is unique
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

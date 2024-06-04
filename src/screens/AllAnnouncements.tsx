import React, { useEffect } from "react";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";
import type { tweetData } from "./Home.tsx";
import { APIUrl } from "./Home.tsx";
import LogoBar from "../components/home/LogoBar.tsx";
import Announcements from "../components/home/announcements/Announcement.tsx";

function AllAnnouncements() {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = React.useState<tweetData[]>([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      fetch(APIUrl + "tweets")
        .then((res) => {
          if (res.ok) {
            res.json().then((json) => {
              setAnnouncements(json.data);
            });
          } else {
            console.log(`status code: ${res.status}`);
            setAnnouncements([
              {
                id: -1,
                attributes: {
                  title: "Uh Oh!",
                  description: "Looks like there was an issue!",
                  date: "None"
                },
              },
            ]);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    };
    fetchUpdates();
  }, []);

  return (
    <div className="container">
      <LogoBar />
      <div className="mt-4 ms-4 portal-nav">
        <div className = "grab-cursor">
        <AngleLeftIcon size="md" onClick={() => navigate("/")} />
        </div>
      </div>
      <div className="heading">All Announcements</div>
      <Announcements tweets={announcements} vertical={true}/>
    </div>
  );
}

export default AllAnnouncements;
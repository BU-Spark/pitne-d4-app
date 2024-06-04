import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { tweetData } from "../../../screens/Home.tsx";
function ViewAllAnnouncements(props: { tweets: tweetData[] }) {
  const navigate = useNavigate();
  //navigate to allPosts
  const goToAnnouncements = () => {
    navigate("/all-announcements", {});
  };

  return (
    <div className="container">
      <Button
        className="home-button px-3 py-2 mb-2"
        variant="primary"
        onClick={() => goToAnnouncements()}
      >
        View All Announcements
      </Button>
    </div>
  );
}

export default ViewAllAnnouncements;
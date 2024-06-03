import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { tweetData } from "../../../screens/Home.tsx";
function ViewAllPosts(props: { tweets: tweetData[] }) {
  const navigate = useNavigate();
  //navigate to allPosts
  const goToPosts = () => {
    navigate("/all-announcements", {});
  };

  return (
    <div className="container">
      <Button
        className="px-3 py-2 mb-2 pinned pf-u-text-center"
        variant="primary"
        onClick={() => goToPosts()}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        View All Announcements
      </Button>
    </div>
  );
}

export default ViewAllPosts;
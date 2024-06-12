import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { announData } from "../../../screens/Home";
function ViewAllAnnouncements(props: { announs: announData[] }) {
  const navigate = useNavigate();
  //navigate to allPosts
  const goToAnnouncements = () => {
    navigate("/all-announcements", {});
  };

  return (
    <div className="view-all-announcements-container">
      <div className="view-all-background">
        <span className="view-all-link" onClick={goToAnnouncements}>
          View All Announcements &gt;
        </span>
      </div>
    </div>
  );
}

export default ViewAllAnnouncements;
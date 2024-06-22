import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { calData } from "../../../screens/Home";
function ViewAllCalData(props: { data: calData[] }) {
  const navigate = useNavigate();
  //navigate to allPosts
  const goToPosts = () => {
    navigate("/all-events", {});
  };

  return (
    <div className="view-all-announcements-container">
      <div className="view-all-background">
        <span className="view-all-link" onClick={goToPosts}>
          View All Events &gt;
        </span>
      </div>
    </div>
  );
}

export default ViewAllCalData
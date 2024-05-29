import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";

function ViewAllEvents() 
{
  const navigate = useNavigate();
  //navigate to allPosts
//   const goToAnnouncements = () => {
//     navigate("/all-announcements", {});
//   };

  return (
    <div className="container" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
      }}>
      <Button
        className="px-3 py-2 mb-2 pinned pf-u-text-center"
        variant="primary"
        // onClick={() => goToAnnouncements()}
      >
        Add Event!
      </Button>
    </div>
  );
}

export default ViewAllEvents;
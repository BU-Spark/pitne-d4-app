import React from "react";
import { useNavigate } from "react-router-dom";
import { announData } from "../../screens/Home";
function ViewAllAnnouncements(props: { announs: announData[] }) {
  const navigate = useNavigate();
  //navigate to allPosts
  const goToAnnouncements = () => {
    navigate("/all-announcements", {});
  };

  return (
    <div className="view-all-announcements-container-white">
      <div className="view-all-background-white">
        <span className="view-all-link" onClick={goToAnnouncements}>
          View All Announcements &gt;
        </span>
      </div>
    </div>
  );
}

export default ViewAllAnnouncements;
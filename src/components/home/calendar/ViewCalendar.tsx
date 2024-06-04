import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { calData } from "../../../screens/Home.tsx";
function ViewAllCalData(props: { data: calData[] }) {
  const navigate = useNavigate();
  //navigate to allPosts
  const goToPosts = () => {
    navigate("/all-events", {});
  };

  return (
    <div className="container">
      {/* Button that takes you to calendar page */}
      <Button
        className="home-button px-3 py-2 mb-2"
        variant="primary"
        onClick={() => goToPosts()}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        View Calendar
      </Button>
    </div>
  );
}

export default ViewAllCalData
import React from "react";
import { Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { upData } from "../../screens/Home";
function ViewAllPosts(props: { updates: upData[] }) {
  const navigate = useNavigate();
  //navigate to allPosts
  const goToPosts = () => {
    navigate("/all-posts", {});
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
        View All Posts
      </Button>
    </div>
  );
}

export default ViewAllPosts;

import React, { useEffect, useState } from "react";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";
import type { upData } from "./Home.tsx";
import { APIUrl } from "./Home.tsx";
import Updates from "../components/home/Updates.tsx";
import LogoBar from "../components/home/LogoBar.tsx";

function AllPosts() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState<upData[]>([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch(APIUrl + "updates");
        if (response.ok) {
          const json = await response.json();
          setUpdates(json.data);
        } else {
          console.log(`status code: ${response.status}`);
          setUpdates([
            {
              id: -1,
              attributes: {
                title: "Uh Oh!",
                content: "Looks like there was an issue!",
              },
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUpdates();
  }, []);

  return (
    <div className="container">
      <div className = "mb-5">
      <LogoBar />
      </div>
      <div className="top-heading">All Posts</div>
      <Updates updates={updates} vertical={true} />
    </div>
  );
}

export default AllPosts;
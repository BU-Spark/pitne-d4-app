import React, { useEffect } from "react";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";
import type { upData } from "./Home";
import { APIUrl } from "./Home";
import Updates from "../components/home/Updates";
import LogoBar from "../components/home/LogoBar";

function AllPosts() {
  const navigate = useNavigate();

  const [updates, setUpdates] = React.useState<upData[]>([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      fetch(APIUrl + "updates")
        .then((res) => {
          if (res.ok) {
            res.json().then((json) => {
              setUpdates(json.data);
            });
          } else {
            console.log(`status code: ${res.status}`);
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
        All Posts
      </div>
      <Updates updates={updates} vertical={true} />
    </div>
  );
}

export default AllPosts;

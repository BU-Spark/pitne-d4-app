import React, { useEffect } from "react";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";
import type { calData } from "./Home";
import { APIUrl } from "./Home";
import Events from "../components/home/calendar/Calendar";
import LogoBar from "../components/home/LogoBar";
import MonthCalendar from "../components/home/calendar/MonthCalendar";

function AllEvents() {
  const navigate = useNavigate();

  const [calendarData, setCalendarData] = React.useState<calData[]>([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      fetch(APIUrl + "calendars")
        .then((res) => {
          if (res.ok) {
            res.json().then((json) => {
                setCalendarData(json.data);
            });
          } else {
            console.log(`status code: ${res.status}`);
            setCalendarData([
              {
                id: -1,
                attributes: {
                    title: "Uh Oh!",
                    body: "Looks like there was an issue!",
                    date: "",
                    location: "",
                //   content: "Looks like there was an issue!",
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
        <AngleLeftIcon size="md" onClick={() => navigate("/home")} />
        All Posts
      </div>
      <MonthCalendar />
      <Events data={calendarData}/>
    </div>
  );
}

export default AllEvents;

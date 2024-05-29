// Screen with all the calendar and event data
import React, { useEffect, useState } from "react";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";
import type { calData } from "./Home";
import { APIUrl } from "./Home";
import Events from "../components/home/calendar/Calendar";
import LogoBar from "../components/home/LogoBar";
import MonthCalendar from "../components/home/calendar/MonthCalendar";
import EventButton from "../components/home/calendar/AddEvent";

function AllEvents() {
  const navigate = useNavigate();
  const [calendarData, setCalendarData] = useState<calData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Filters events to match the user's selected date
  const filteredEvents = calendarData.filter(event => {
    const eventDate = new Date(event.attributes.date);
    return (
      // Returns an event if the date matches the selection
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === (selectedDate.getMonth()) &&
      eventDate.getDate() === selectedDate.getDate()
    );
    
  });

  return (
    <div className="container">
      <LogoBar />
      <div className="mt-4 ms-4 portal-nav">
        <AngleLeftIcon size="md" onClick={() => navigate("/home")} />
        All Posts
      </div>
      <MonthCalendar onDateChange={handleDateChange} />
      <EventButton />
      <Events data={filteredEvents} />
    </div>
  );
}

export default AllEvents;

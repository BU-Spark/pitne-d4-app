import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { calData } from "./Home";
import { APIUrl } from "./Home";
import Events from "../components/calendar/Calendar";
import NavBar from "../components/navbar/NavBar";
import MonthCalendar from "../components/calendar/MonthCalendar";
import Footer from "../components/Footer";
// import { useIsManager } from "./Home";

function AllEvents() {
  const [calendarData, setCalendarData] = useState<calData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());


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
      (eventDate.getDate()) === selectedDate.getDate()
    );

  });

  const upcomingEvents = calendarData.filter(event => {
    const eventDate = new Date(event.attributes.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  })
    .sort((a, b) => {
      const dateA = new Date(a.attributes.date).getTime();
      const dateB = new Date(b.attributes.date).getTime();
      return dateA - dateB;
    });

  const fetchEvents = async () => {
    try {
      const response = await fetch(APIUrl + "events?populate=*");

      if (response.ok) {
        const json = await response.json();

        const fetchedEvents = json.data.map((item: any) => ({
          id: item.id,
          attributes: {
            title: item.attributes.EventName,
            body: item.attributes.Description,
            image: item.attributes.EventFlyer?.data && item.attributes.EventFlyer.data.length > 0
              ? "http://pitne-d4-app-strapi-production.up.railway.app" + item.attributes.EventFlyer.data[0].attributes.url
              : '',
            date: item.attributes.EventDate,
            location: item.attributes.Location,
            time: item.attributes.Time,
          },
        }));

        setCalendarData(fetchedEvents);
      } else {
        console.log(`Status code: ${response.status}`);

        setCalendarData([
          {
            id: -1,
            attributes: {
              title: "Uh Oh!",
              body: "Looks like there was an issue!",
              image: '',
              date: '',
              location: '',
              time: '',
            },
          },
        ]);
      }
    } catch (error) {
      // Log any error that occurred during the fetch
      console.error("Fetch Error:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="mb-5">
          <NavBar />
        </div>
        <NavBar />

        <div className="top-heading">District 4 Events Calendar</div>
        <MonthCalendar onDateChange={handleDateChange} calendarData={calendarData} />
        <div className="calendar-text">
          Events on {selectedDate.toDateString()}:
        </div>

        <Events data={filteredEvents} />
        <div className="calendar-text">All Upcoming Events: </div>
        <Events data={upcomingEvents} />
      </div>
      <Footer />
    </div>
  );
}

export default AllEvents;
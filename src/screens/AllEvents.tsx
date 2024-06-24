import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, collection, getDocs} from "firebase/firestore";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";
import type { calData } from "./Home";
import { APIUrl } from "./Home";
import Events from "../components/home/calendar/Calendar";
import LogoBar from "../components/home/LogoBar";
import MonthCalendar from "../components/home/calendar/MonthCalendar";
import EventButton from "../components/home/calendar/AddEvent";
import axios from "axios";
import Footer from "../components/home/footer";
// import { useIsManager } from "./Home";

function AllEvents() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [calendarData, setCalendarData] = useState<calData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());


  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Filters events to match the user's selected date
  const filteredEvents = calendarData.filter(event => {
    const eventDate = new Date(event.attributes.date);
    // console.log(` ${eventDate},  ${selectedDate},  ${event.attributes.date}`);

    return (
      // Returns an event if the date matches the selection
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === (selectedDate.getMonth()) &&
      (eventDate.getDate()) === selectedDate.getDate()
    );
    
  });

  const fetchEvents = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("http://pitne-d4-app-strapi-production.up.railway.app/api/events?populate=*");
      const fetchedEvents = data.map((item: any) => ({
        id: item.id,
        attributes: {
          title: item.attributes.EventName,
          body: item.attributes.Description, 
          image: item.attributes.EventFlyer?.data && item.attributes.EventFlyer.data.length > 0
          ? "http://pitne-d4-app-strapi-production.up.railway.app" + item.attributes.EventFlyer.data[0].attributes.url
          : '',
          date: item.attributes.EventDate,
          location: item.attributes.Location,
          time: item.attributes.EventDate,
        }, 
      }));
      console.log(fetchedEvents);
      // console.log(image);

      setCalendarData(fetchedEvents);
    } catch (error) {
      console.error('Fetching events failed:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
    <div className="container">
      <div className = "mb-5">
      <LogoBar />
      </div>
      <LogoBar />

      <div className="top-heading">DISTRICT 4 EVENTS CALENDAR</div>
      <MonthCalendar onDateChange={handleDateChange} calendarData={calendarData}/>
      <div className="calendar-text">
        Events on {selectedDate.toDateString()}:
      </div>

      <Events data={filteredEvents} />

      <div className = "calendar-text">ALL UPCOMING EVENTS: </div>
        <Events data={calendarData} />
    </div>
    <Footer />
    </div>
  );
}

export default AllEvents;
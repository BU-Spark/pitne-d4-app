// Screen with all the calendar and event data
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, collection, getDocs} from "firebase/firestore";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";
import type { calData } from "./Home.tsx";
import { APIUrl } from "./Home.tsx";
import Events from "../components/home/calendar/Calendar.tsx";
import LogoBar from "../components/home/LogoBar.tsx";
import MonthCalendar from "../components/home/calendar/MonthCalendar.tsx";
import EventButton from "../components/home/calendar/AddEvent.tsx";
// import { useIsManager } from "./Home.tsx";

function AllEvents() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [calendarData, setCalendarData] = useState<calData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const eventsCollection = collection(db, "events");
        // Get all documents from the "events" collection
        const eventsSnapshot = await getDocs(eventsCollection);
        // Map through each document and get its data
        const eventsList = eventsSnapshot.docs.map(doc => ({
          ...doc.data()
        })) as calData[];
        //set the calendar data
        console.log("events list");
        if (auth.currentUser){console.log("User: " + auth.currentUser.email);}
        else {console.log("User is null");}
        setCalendarData(eventsList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCalendarData();
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
      (eventDate.getDate()) === selectedDate.getDate()
    );
    
  });

  return (
    <div className="container">
      <LogoBar />
      {/* <div className="mt-4 ms-4 portal-nav">
      <div className = "grab-cursor">
        <AngleLeftIcon size="md" onClick={() => navigate("/")} />
      </div>
      </div> */}
      <div className="heading">District 4 Events Calendar</div>
      <MonthCalendar onDateChange={handleDateChange} />
      {/* <EventButton /> */}
      {localStorage.getItem('isManager') === 'true' && <EventButton />}  // Conditionally rendering EventButtons
      <Events data={filteredEvents} />
    </div>
  );
}

export default AllEvents;

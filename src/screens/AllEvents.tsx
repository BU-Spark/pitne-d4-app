// Screen with all the calendar and event data
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
// import { useIsManager } from "./Home";

function AllEvents() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [calendarData, setCalendarData] = useState<calData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // useEffect(() => {
  //   const fetchCalendarData = async () => {
  //     try {
  //       const eventsCollection = collection(db, "events");
  //       // Get all documents from the "events" collection
  //       const eventsSnapshot = await getDocs(eventsCollection);
  //       // Map through each document and get its data
  //       const eventsList = eventsSnapshot.docs.map(doc => ({
  //         ...doc.data()
  //       })) as calData[];
  //       //set the calendar data
  //       console.log("events list");
  //       if (auth.currentUser){console.log("User: " + auth.currentUser.email);}
  //       else {console.log("User is null");}
  //       setCalendarData(eventsList);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchCalendarData();
  // }, []);

  function toEST(date: Date): Date {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const estOffset = -300; // EST is UTC-5
    return new Date(date.getTime() + userTimezoneOffset + (estOffset * 60 * 1000));
  }
  
  const handleDateChange = (date: Date) => {
    const dateInEST = toEST(date);
    setSelectedDate(dateInEST);
    console.log(`Selected Date in EST: ${dateInEST}`);
  };

  // Filters events to match the user's selected date
  const filteredEvents = calendarData.filter(event => {
    const eventDateInEST = toEST(new Date(event.attributes.date));
    console.log(`Event Date in EST: ${eventDateInEST}, Selected Date in EST: ${selectedDate}`);

    return (
      // Returns an event if the date matches the selection
      eventDateInEST.getFullYear() === selectedDate.getFullYear() &&
      eventDateInEST.getMonth() === (selectedDate.getMonth()) &&
      (eventDateInEST.getDate()) === selectedDate.getDate()
    );
    
  });

  const fetchEvents = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("http://localhost:1334/api/events?populate=*");
      const fetchedEvents = data.map((item: any) => ({
        id: item.id,
        attributes: {
          title: item.attributes.EventName,
          body: item.attributes.Description, 
          image: item.attributes.EventFlyer?.data && item.attributes.EventFlyer.data.length > 0
          ? "http://localhost:1337" + item.attributes.EventFlyer.data[0].attributes.url
          : '',
          date: item.attributes.EventDate,
          location: item.attributes.Location, 
        }, 
      }));
      console.log(fetchedEvents);

      setCalendarData(fetchedEvents);
    } catch (error) {
      console.error('Fetching events failed:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container">
      <div className = "mb-5">
      <LogoBar />
      </div>
      {/* <LogoBar /> */}
      {/* <div className="mt-4 ms-4 portal-nav">
      <div className = "grab-cursor">
        <AngleLeftIcon size="md" onClick={() => navigate("/")} />
      </div>
      </div> */}
      <div className="top-heading">District 4 Events Calendar</div>
      <MonthCalendar onDateChange={handleDateChange} />
      {/* <EventButton /> */}
      {/* {localStorage.getItem('isManager') === 'true' && <EventButton />} EST time zone */}
      <Events data={filteredEvents} />

      <div className = "calendar-text">All Upcoming Events: </div>
        <Events data={calendarData} />
    </div>
  );
}

export default AllEvents;

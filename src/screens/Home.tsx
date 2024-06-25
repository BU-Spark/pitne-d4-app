import * as React from "react";
import { useState } from "react";
import { useEffect, useCallback } from "react";
import NavBar from "../components/navbar/NavBar";
import Announcement from "../components/announcements/Announcement";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "@patternfly/react-core";
import ViewAllAnnouncements from "../components/announcements/ViewAllAnnouncements";
import ViewCalendar from "../components/calendar/ViewCalendar";
import axios from "axios";
import MonthCalendar from "../components/calendar/MonthCalendar";
import Events from "../components/calendar/Calendar";
import ClientImage from '../images/BrianW.png'
import ScrollDirection from "../components/calendar/ScrollDirection";

const APIUrl = "https://pitne-d4-app-strapi-production.up.railway.app/api/";

// Initialise the type of calendar and tweet data we are getting from strapi
type calData = {
  id: number;
  attributes: {
    title: string;
    image: string;
    body: string;
    date: string;
    time: string;
    location: string;
  };
};

type announData = {
  id: number;
  attributes: {
    title: string;
    description: string;
    date: string;
  };
};

type upData = {
  id: number;
  attributes: {
    title: string;
    content: string;
  };
};

type DevelopmentData = {
  id: string;
  attributes: {
    title: string;
    body: string;
    website?: string;
    date?: string;
  };
};

type HomePageData = {
  heroTitle: string;
  heroDescription: string;
  heroImage: { url: string };
  councilorName: string;
  councilorDescription: string;
  councilorImage: { url: string };
};

function Home() {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [calendarData, setCalendarData] = React.useState<calData[]>([]);

  const [announData, setAnnounData] = React.useState<announData[]>([]);

  const [developmentData, setDevelopmentData] = React.useState<DevelopmentData[]>([]);
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);

  const [email, setEmail] = useState('');
  const [mailingListError, setMailingListError] = useState('');

  const usescrollDirection = ScrollDirection();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  // Mailing List
  const handleSubscribe = async () => {
    if (email) {
      try {
        const response = await fetch('https://pitne-d4-app-strapi-production.up.railway.app/api/mailing-lists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              Email: email
            }
          })
        });
        if (response.status === 200 || response.status === 201) {
          setEmail(''); // Clear the input after successful subscription
          setMailingListError("You will be successfully subscribed in some time!");
        } else if (response.status == 400) {
          setMailingListError("Please enter a valid email");
        } else {
          setMailingListError('An error occurred while subscribing, please try again later');
        }
      } catch (error) {
        setMailingListError('An error occurred while subscribing, please try again later');
      }
    }
  };


  // Reading in home page data from Strapi
  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        // Adjust the URL to match your Strapi API endpoint
        const response = await axios.get('https://pitne-d4-app-strapi-production.up.railway.app/api/home-page?populate=*');
        const data = response.data.data.attributes;
        setHomePageData({
          heroTitle: data.heroTitle,
          heroDescription: data.heroDescription,
          heroImage: data.heroImage.data.attributes.url,
          councilorName: data.councilorName,
          councilorDescription: data.councilorDescription,
          councilorImage: data.councilorImage.data.attributes.url
        });
      } catch (error) {
        console.error('Fetching home page data failed:', error);
      }
    };

    fetchHomePageData();
  }, []);

  // create object to pass as props to Calendar component
  const passCalendarData = {
    data: calendarData,
  };
  const passAnnounData = {
    announs: announData,
  };
  const passDevData = {
    developments: developmentData,
  };


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

  // Fetches event data from Strapi
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
    <body>
      <div className="hero-section">
        <div className="mb-5">
          <NavBar />
        </div>
        <div className="overlay"></div>
        <div className="hero-content">
          <div className="top-heading-white">WELCOME TO THE DISTRICT 4 WEBSITE</div>
          <p>District 4 includes Mattapan, Dorchester, and parts of Jamaica Plain and Roslindale</p>
        </div>
        <div className="scroll-down-container">
          <div className="scroll-down">
            <span>Swipe up to learn more</span>
            <div className="arrow"></div>
          </div>
        </div>
      </div>
      <div className="container">
      </div>

      <div className="councilor-section">
        <div className="councilor-background">
          <div className="overlay"></div>
          <div className="councilor-content">
            <h2 className="councilor-heading">ABOUT THE COUNCILOR</h2>
            <div className='p-4'>
              <img src={ClientImage} alt="Client image" />
            </div>
            <p className="councilor-description">
              Councilor Brian Worrell has been dedicated to serving the community of District 4 for many years. His efforts focus on improving local infrastructure, increasing public safety, and ensuring that every voice in the district is heard and valued.
            </p>
            <button className="learn-more-button" onClick={() => window.location.href = '/councilor-info'}>
              Learn more
            </button>
          </div>
        </div>
      </div>


      <div className="blue-background-container">
        <div className="top-heading-white">ANNOUNCEMENTS</div>
        <Announcement {...passAnnounData} vertical={false} />
        <ViewAllAnnouncements {...passAnnounData} />
      </div>

      <div className="top-heading">EVENTS CALENDAR</div>
      <div className="calendar-page">
        <div className="calendar-container">
          <MonthCalendar onDateChange={handleDateChange} calendarData={calendarData} />
        </div>
        <div className="events-container">
          <div className="calendar-text">
            Events on {selectedDate.toDateString()}:
          </div>
          <Events data={filteredEvents} scrollDirection={usescrollDirection} />
          <div className="view-calendar-button-container">
            <div style={{ borderRadius: '50%', overflow: 'hidden' }}>
              <ViewCalendar {...passCalendarData} />
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
      <div className="heading mb-2" style={{ fontFamily: 'montserrat', color: "white", fontWeight: "bold", fontSize: "16px" }}>
        SUBSCRIBE TO MAILING LIST
      </div>
      <div className="m-4">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <TextInput
        value={email}
        type="email"
        onChange={handleEmailChange}
        aria-label="email-input"
        placeholder="Enter your email"
        style={{ fontFamily: 'montserrat', border: '1px solid #ccc', borderRadius: '0', marginRight: '10px', fontSize: '14px', fontStyle:'italic' }}
      />
      <Button onClick={handleSubscribe} variant="primary" style={{ padding: '5px', borderRadius: '0', border: '1px solid white', fontSize: '15px', fontFamily: 'montserrat' }}>
        Subscribe
      </Button>
      </div>
      {
      mailingListError && (
        <div style={{ fontStyle: "italic", color: 'white' }}>
          <p>{mailingListError}</p>
        </div>
            )
          }
        </div>
        <hr style={{ width: '100%', height: '1px', borderColor: 'white' }} />
        <div className="heading mb-2" style={{ fontFamily: 'montserrat', color: "white", textAlign: 'center', fontWeight: "bold", fontSize: "16px" }}>
          CONTACT
        </div>
        <div className="footer-content" style={{ padding: '0 15px' }}>
          <div className="footer-section about">
            <p style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white', margin: '5px 0' }}>
              <a href="mailto:brian.worrell@boston.gov" style={{ color: 'white', fontWeight: "450", fontSize: '14px' }}>Mail To: brian.worrell@boston.gov</a>
            </p>
            <p style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white', margin: '5px 0' }}>
              <a href="tel:+16176353131" style={{ color: 'white', fontWeight: "450", fontSize: '14px' }}>Call: +1 617-635-3131</a>
            </p>
            <p style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white', margin: '5px 0', marginBottom: '10px' }}>
              <a href="https://www.google.com/maps/dir//5+Erie+St,+Dorchester,+MA+02121/@42.3266068,-71.1355474,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89e37bc15204b3e5:0x4e18ab632ba37f9e!2m2!1d-71.0788007!2d42.303259?entry=ttu" style={{ color: 'white', fontWeight: "450", fontSize: '14px' }}>
                District office: 5 Erie St, Dorchester, MA 02121
              </a>
            </p>
          </div>
        </div>
        <div className="footer-bottom" style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white' }}>
          &copy; 2024 District 4. All rights reserved.
        </div>
      </footer>
    </body >
  );
}

export type { calData };
export type { announData };
export type { upData };
export type { DevelopmentData }
export { APIUrl };

export default Home;

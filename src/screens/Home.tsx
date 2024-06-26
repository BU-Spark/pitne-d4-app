import * as React from "react";
import { useEffect, useState } from "react";
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
import { ContactInfoTable } from "../interfaces";
import { METHODS } from "http";

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
  id: number
  attributes: {
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    councilorDescription: string;
    councilorImage: string;
  }
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

  const [contactInfo, setContactInfo] = React.useState<ContactInfoTable>();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  }

  // Fetch contact info from Strapi
  React.useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('https://pitne-d4-app-strapi-production.up.railway.app/api/contact-infos', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setContactInfo(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching associations from Strapi:', error);
      }
    };
    fetchContactInfo();
  }, []);


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
  const fetchHomePageData = async () => {
    try {
      const response = await fetch(APIUrl + "home-pages?populate=*");

      if (response.ok) {
        const json = await response.json();

        const fetchedHomePageData = {
          id: json.data.id,
          attributes: {
            heroTitle: json.data[0].attributes.welcomeTitle,
            heroDescription: json.data[0].attributes.welcomeDescription,
            heroImage: `https://pitne-d4-app-strapi-production.up.railway.app` + json.data[0].attributes.welcomeImage.data[0].attributes.url,
            councilorDescription: json.data[0].attributes.CouncilorDesc,
            councilorImage: `https://pitne-d4-app-strapi-production.up.railway.app` + json.data[0].attributes.CouncilorImage.data.attributes.url,
          },
        };

        setHomePageData(fetchedHomePageData);

      } else {
        setHomePageData(null);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setHomePageData(null);
    }
  };

  useEffect(() => {
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
            image: item.attributes.EventFlyer.data ? `https://pitne-d4-app-strapi-production.up.railway.app${item.attributes.EventFlyer.data.attributes.url}` : null,
            date: item.attributes.EventDate,
            location: item.attributes.Location,
            time: item.attributes.Time,
          },
        }));
        setCalendarData(fetchedEvents);
      } else {
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
  if (!homePageData) {
    return <div>Loading...</div>;
  }

  return (
    <body>
      <div className="hero-section" style={{ backgroundImage: `url(${homePageData.attributes.heroImage})` }}>
        <div className="mb-5">
          <NavBar />
        </div>
        <div className="overlay"></div>
        <div className="hero-content">
          <div className="top-heading-white">{homePageData.attributes.heroTitle}</div>
          <p>{homePageData.attributes.heroDescription}</p>
        </div>
        <div className="scroll-down-container">
          <div className="scroll-down">
            <span>Swipe up to learn more</span>
            <div className="arrow"></div>
          </div>
        </div>
      </div>
      <div className="page-container">
        <div className="councilor-section">
          <div className="overlay"></div>
          <div className="councilor-content">
            <h2 className="councilor-heading">ABOUT THE COUNCILOR</h2>
            <div className='p-4'>
              <img src={homePageData.attributes.councilorImage} alt="Councilor" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <p className="councilor-description">
              {homePageData.attributes.councilorDescription}
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
              style={{ fontFamily: 'montserrat', border: '1px solid #ccc', borderRadius: '0', marginRight: '10px', fontSize: '14px', fontStyle: 'italic' }}
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
              <a href={`mailto:${contactInfo?.attributes.Email}`} style={{ color: 'white', fontWeight: "450", fontSize: '14px' }}>Mail To: {contactInfo?.attributes.Email}</a>
            </p>
            <p style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white', margin: '5px 0' }}>
              <a href={`tel:+1${contactInfo?.attributes.Email}`} style={{ color: 'white', fontWeight: "450", fontSize: '14px' }}>Call: +1 {contactInfo?.attributes.PhoneNumber}</a>
            </p>
            <p className='mb-3' style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white', margin: '5px 0', marginBottom: '10px' }}>
              {contactInfo?.attributes.Address && (
                <a href={`https://www.google.com/maps/dir//${encodeURIComponent(contactInfo.attributes.Address)} ?entry=ttu`} style={{ color: 'white', fontWeight: "450", fontSize: '14px' }}>
                  District office: {contactInfo?.attributes.Address}
                </a>
              )}
            </p>
          </div>
        </div >
        <div className="footer-bottom" style={{ fontFamily: 'lora', fontWeight: "light", fontSize: "14px", color: 'white' }}>
          &copy; 2024 District 4. All rights reserved.
        </div>
      </footer >
    </body >
  );
}

export type { calData };
export type { announData };
export type { upData };
export type { DevelopmentData }
export { APIUrl };

export default Home;

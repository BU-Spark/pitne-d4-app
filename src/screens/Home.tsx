import * as React from "react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import Search from "../components/home/Search";
import { useEffect, useCallback } from "react";
import Calendar from "../components/home/calendar/Calendar";
import Pinned from "../components/home/Pinned";
import Updates from "../components/home/Updates";
import LogoBar from "../components/home/LogoBar";
import ViewAllPosts from "../components/home/ViewAllPosts";
import Announcement from "../components/home/announcements/Announcement";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "@patternfly/react-core";
import ViewAllAnnouncements from "../components/home/announcements/ViewAllAnnouncements";
import ViewCalendar from "../components/home/calendar/ViewCalendar";
import Resources from "../components/home/Resources";
import { cursorTo } from "readline";
import DevelopmentUpdates from "../components/home/Developments/Development";
import ViewAllDevs from "../components/home/Developments/ViewAllDevs";
import axios from "axios";
import MonthCalendar from "../components/home/calendar/MonthCalendar";
import Events from "../components/home/calendar/Calendar";
import ClientImage from '../images/BrianW.png'


//for dev,
// const APIUrl = "https://se-d7-dev.up.railway.app/api/";
const APIUrl = "https://pitne-d4-app-strapi-production.up.railway.app/api/";

//initialise the type of calendar and tweet data we are getting from strapi
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




function checkIfManager() {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const db = getFirestore();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email;
        const adminCollection = collection(db, 'Admin-Accounts');
        const q = query(adminCollection, where('admin-email', '==', userEmail));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          console.log("User is logged in and is an admin.");
          localStorage.setItem('isManager', 'true');
          resolve(true);  // Resolve the promise with true
        } else {
          console.log("User is logged in but is not an admin.");
          localStorage.setItem('isManager', 'false');
          resolve(false); // Resolve the promise with false
        }
      } else {
        console.log("No user is currently logged in.");
        localStorage.setItem('isManager', 'false');
        resolve(false); // Resolve the promise with false
      }
    });
  });
}

// const isManager = localStorage.getItem('isManager') === 'true';


// const [isManager, setIsManager] = useState(false);



function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  //updateData array of upData type
  const [updateData, setUpdateData] = React.useState<upData[]>([]);
  const [pinned, setPinned] = React.useState<
    { title: string; links: { title: string; url: string }[] }[]
  >([]);
  const [InvolvedData, setInvolvedData] = React.useState<{
    title: string;
    links: { title: string, url: string }[]
  }[]>([]);

  const [SubmitandRequestData, setSubmitandRequestData] = React.useState<{
    title: string;
    links: { title: string, url: string }[]
  }[]>([]);
  //calendarData array of calData type
  const [calendarData, setCalendarData] = React.useState<calData[]>([]);
  //announData array of announData type
  const [announData, setAnnounData] = React.useState<announData[]>([]);
  // const [tweetData, setTweetData] = React.useState<tweetData[]>([]);
  const [developmentData, setDevelopmentData] = React.useState<DevelopmentData[]>([]);
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);

  const [email, setEmail] = useState('');
  const [mailingListError, setMailingListError] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

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
        console.log(error);
        setMailingListError('An error occurred while subscribing, please try again later');
      }
    }
  };


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

  // useEffect(() => {
  //   const fetchHomePageData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:1334/api/home-page?populate=*');
  //       const homePageData = response.data.data.attributes;
  //       setHomePageData(homePageData);
  //     } catch (error) {
  //       console.error('Fetching home page data failed:', error);
  //     }
  //   };

  //   fetchHomePageData();
  // }, []);



  // This function fetch user interests from user-profile
  // The userEmail has default parameter to handle anonymous users that wants to use app without logging in
  const fetchdata = useCallback(async (userEmail = "defaultuser@email.com") => {
    const userProfileRef = doc(db, "user-profile", userEmail);
    await getDoc(userProfileRef)
      .then((doc) => {
        if (doc.exists()) {
          // Gets user interest from firebase
          const userInterests: string[] = doc.data()["interests"];
          // then transfers the data so that can be passed to pinned
          // pinned.tsx will do the searching for the sub categories in the database resource-lists
          const transformedInterests = userInterests.map((userInterest: string) => ({
            title: userInterest,
            links: [],
          }));
          setPinned(transformedInterests);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [db]);

  useEffect(() => {
    const fetchManagerStatus = async () => {
      // Only fetch from Firestore if the local storage does not have the manager status
      if (localStorage.getItem('isManager') === null) {
        await checkIfManager();
        console.log("called function check Manager status");
      }
    };

    fetchManagerStatus();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        fetchdata(user.email);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, fetchdata]);


  //fetch calendar data from Strapi
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const eventsCollection = collection(db, "events");
        // Get all documents from the "events" collection
        const eventsSnapshot = await getDocs(eventsCollection);
        // Map through each document and get its data
        const eventsList = eventsSnapshot.docs.map(doc => ({
          // id: doc.id,
          ...doc.data()
        })) as calData[];
        //set the calendar data
        console.log("events list");
        setCalendarData(eventsList);
      } catch (error) {
        console.log(error);
      }
    };


    const fetchAnnounData = async () => {
      try {
        const announsCollection = collection(db, "announcements");
        // Get all documents from the "events" collection
        const announSnapshot = await getDocs(announsCollection);
        // Map through each document and get its data
        const announList = announSnapshot.docs.map(doc => ({
          // id: doc.id,
          ...doc.data()
        })) as announData[];
        //set the calendar data
        console.log("announ list");
        setAnnounData(announList);
      } catch (error) {
        console.log(error);
      }


    };

    const fetchUpdateData = async () => {
      fetch(APIUrl + "updates")
        .then((res) => {
          if (res.ok) {
            res.json().then((json) => {
              setUpdateData(json.data);
            });
          } else {
            console.log(`status code: ${res.status}`);
            setUpdateData([
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
    const fetchGetInvolvedData = async () => {
      fetch(APIUrl + "get-involveds").then((res) => {
        if (res.ok) {
          res.json().then((json) => {
            const links = json.data.map((obj: any) => ({ title: obj.attributes.title, url: obj.attributes.url }));
            const result = [{ title: 'Get Involved', links }];
            setInvolvedData(result);
          });
        } else {
          console.log(`status code: ${res.status}`);
        }
      }).catch((e) => {
        console.log(e);
      })
    };
    //Get Submit and Request Data
    const fetchDevelopmentData = async () => {
      const developmentCollection = collection(db, "Developments");
      const snapshot = await getDocs(developmentCollection);
      const loadedDevelopments = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as DevelopmentData[];
      console.log(loadedDevelopments)
      setDevelopmentData(loadedDevelopments);
    }

    fetchDevelopmentData();
    fetchCalendarData();
    fetchAnnounData();
    fetchUpdateData();
    fetchGetInvolvedData();
  }, [db]);

  //create object to pass as props to Calendar component
  const passCalendarData = {
    data: calendarData,
  };
  const passAnnounData = {
    announs: announData,
  };
  const passDevData = {
    developments: developmentData,
  };

  useEffect(() => {
    // if no user is authenticated, fetch data for the default user 
    if (!auth.currentUser) {
      fetchdata();
    }
  }, [auth.currentUser, fetchdata]);


  // const [calendarData, setCalendarData] = useState<calData[]>([]);
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
          time: item.attributes.Time,
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

  // if (!homePageData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <body>
      <div className="hero-section">
        <div className="mb-5">
          <LogoBar />
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
            <button className="learn-more-button" onClick={() => window.location.href = '/client-info'}>
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

      {/* <Resources resources={InvolvedData} />
        <Resources resources={SubmitandRequestData} /> */}

      <div className="top-heading">EVENTS CALENDAR</div>
      <div className="calendar-page">
        <div className="calendar-container">
          <MonthCalendar onDateChange={handleDateChange} calendarData={calendarData} />
        </div>
        <div className="events-container">
          <div className="calendar-text">
            Events on {selectedDate.toDateString()}:
          </div>
          <Events data={filteredEvents} />
          <div className="view-calendar-button-container">
            <div style={{ borderRadius: '50%', overflow: 'hidden' }}>
              <ViewCalendar {...passCalendarData} />
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="heading mb-4" style={{ color: "white" }}>SUBSCRIBE TO MAILING LIST</div>
        <div className="m-4">
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <TextInput
              value={email}
              type="email"
              onChange={handleEmailChange}
              aria-label="email-input"
              placeholder="Enter your email"
              style={{ border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <Button onClick={handleSubscribe} variant="primary" style={{ padding: '5px', border: '1px solid white' }}>
              Subscribe
            </Button>
          </div>
          {
            mailingListError && (
              <div style={{ fontStyle: "italic" }}>
                <p>{mailingListError}</p>
              </div>
            )
          }
        </div>
        <hr style={{ width: '100%', height: '1px', borderColor: 'white' }} />
        <div className="heading mb-4" style={{ color: "white", textAlign: 'center' }}>CONTACT</div>
        <div className="footer-content">
          <div className="footer-section about">
            <p>
              <a href="mailto:brian.worrell@boston.gov">Mail To: brian.worrell@boston.gov</a>
            </p>
            <p>
              <a href="tel:+16176353131">Call: +1 617-635-3131</a>
            </p>
            <p>
              <a href="https://www.google.com/maps/dir//5+Erie+St,+Dorchester,+MA+02121/@42.3266068,-71.1355474,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89e37bc15204b3e5:0x4e18ab632ba37f9e!2m2!1d-71.0788007!2d42.303259?entry=ttu">
                District office: 5 Erie St, Dorchester, MA 02121
              </a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
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

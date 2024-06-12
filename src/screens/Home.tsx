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
import { Button } from "@patternfly/react-core";
import ViewAllAnnouncements from "../components/home/announcements/ViewAllAnnouncements";
import ViewCalendar from "../components/home/calendar/ViewCalendar";
import Resources from "../components/home/Resources";
import { cursorTo } from "readline";
import DevelopmentUpdates from "../components/home/Developments/Development";
import ViewAllDevs from "../components/home/Developments/ViewAllDevs";

//for dev,
const APIUrl = "https://se-d7-dev.up.railway.app/api/";


//initialise the type of calendar and tweet data we are getting from strapi
type calData = {
  id: number;
  attributes: {
    title: string;
    body: string;
    date: string;
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
        // const res = await fetch(APIUrl + "calendars");
        // const json = await res.json();
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
      // try {
      //   const res = await fetch(APIUrl + "tweets");
      //   const json = await res.json();
      //   setannounData(json.data);
      // } catch (error) {
      //   console.error(error);
      // }

      try {
        // const res = await fetch(APIUrl + "calendars");
        // const json = await res.json();
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
    const fetchGetSubmitRequestData = async () => {
      fetch(APIUrl + "submit-requests-and-reports").then((res) => {
        if (res.ok) {
          res.json().then((json) => {
            const links = json.data.map((obj: any) => ({ title: obj.attributes.title, url: obj.attributes.url }));
            const result = [{ title: 'Submit Request and Reports', links }];
            setSubmitandRequestData(result);
          });
        } else {
          console.log(`status code: ${res.status}`);
        }
      }).catch((e) => {
        console.log(e);
      })
    };
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
    fetchGetSubmitRequestData();
  }, [db]);

  //create object to pass as props to Calendar component
  const passCalendarData = {
    data: calendarData,
  };
  const passAnnounData = {
    announs: announData,
  };
  const passUpdateData = {
    updates: updateData,
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

  const handleCall = () => {
    window.location.href = 'tel:311';
  };

  const handleTweet = () => {
    window.open('https://twitter.com/BOS311', '_blank');
  }

  const reportOnline = () => {
    window.open('https://www.boston.gov/departments/boston-311#online-services', '_blank')
  }


  return (
    <body>
      <div className="container">
        <div className="mb-5">
          <LogoBar />
        </div>
        {/* <Search /> */}

        <div className="top-heading">Announcements</div>
        <Announcement {...passAnnounData} vertical={false} />
        <ViewAllAnnouncements {...passAnnounData} />

        <div className="mt-4 text-start heading">Upcoming Events</div>
        <Calendar {...passCalendarData} />
        <ViewCalendar {...passCalendarData} />

        <div className="mt-3 pf-c-title heading text-start">Developments</div>
        <DevelopmentUpdates {...passDevData} vertical={false} />
        <ViewAllDevs />

        <div className="mt-4 my-3 pf-c-title heading text-start">Our Resources</div>

        <div className="container">
          <Button
            className="home-button px-3 py-2 mb-2"
            variant="primary"
            onClick={() => navigate("/getresources")}
          >
            Get Resources
          </Button>
          <Button
            className="home-button px-3 py-2 mb-2"
            variant="primary"
            onClick={() => navigate("/civic-associations-info")}
          >
            Civic Associations
          </Button>
          {/* <div className=“my-3 pf-c-title heading text-start”>Report a Non-Emergency Issue</div>
           */}
          <Button
            onClick={handleCall}
          >
            Call 311
          </Button>
          <Button
            onClick={() => navigate('/DownloadApp')}
          >
            Download the App
          </Button>
          <Button
            onClick={handleTweet}
          >
            Tweet @BOS311
          </Button>
          <Button
            onClick={reportOnline}
          >
            FIle a Report Online
          </Button>
        </div>
        <Resources resources={InvolvedData} />
        <Resources resources={SubmitandRequestData} />

        <div className="mt-4 pf-c-title heading text-start">News and Updates</div>
        <Updates {...passUpdateData} vertical={false} />
        <ViewAllPosts {...passUpdateData} />
      </div>
    </body>
  );
}

export type { calData };
export type { announData };
export type { upData };
export type { DevelopmentData }
export { APIUrl };

export default Home;

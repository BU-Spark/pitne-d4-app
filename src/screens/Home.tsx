import * as React from "react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import Search from "../components/home/Search.tsx";
import { useEffect, useCallback } from "react";
import Calendar from "../components/home/calendar/Calendar.tsx";
import Pinned from "../components/home/Pinned.tsx";
import Updates from "../components/home/Updates.tsx";
import LogoBar from "../components/home/LogoBar.tsx";
import ViewAllPosts from "../components/home/ViewAllPosts.tsx";
import Announcement from "../components/home/announcements/Announcement.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@patternfly/react-core";
import ViewAllAnnouncements from "../components/home/announcements/ViewAllAnnouncements.tsx";
import ViewCalendar from "../components/home/calendar/ViewCalendar.tsx";
import Resources from "../components/home/Resources.tsx";
import { cursorTo } from "readline";

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

type tweetData = {
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
  const [InvolvedData, setInvolvedData] =  React.useState<{title: string; 
    links: {title:string, url: string}[]}[]>([]); 

  const [SubmitandRequestData, setSubmitandRequestData] =  React.useState<{title: string; 
    links: {title:string, url: string}[]}[]>([]); 
  //calendarData array of calData type
  const [calendarData, setCalendarData] = React.useState<calData[]>([]);
  //tweetData array of tweetData type
  const [tweetData, setTweetData] = React.useState<tweetData[]>([]);

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

    const fetchTweetData = async () => {
      try {
        const res = await fetch(APIUrl + "tweets");
        const json = await res.json();
        setTweetData(json.data);
      } catch (error) {
        console.error(error);
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
    const fetchGetInvolvedData = async() =>{
      fetch(APIUrl + "get-involveds").then((res) =>{
        if(res.ok){
          res.json().then((json) =>{
            const links = json.data.map((obj:any) => ({ title: obj.attributes.title, url: obj.attributes.url }));
            const result = [{ title: 'Get Involved', links }];
            setInvolvedData(result);
          });
        }else{
          console.log(`status code: ${res.status}`);
        }
      }).catch((e) =>{
        console.log(e);
      })
    };
    //Get Submit and Request Data
    const fetchGetSubmitRequestData = async() =>{
      fetch(APIUrl + "submit-requests-and-reports").then((res) =>{
        if(res.ok){
          res.json().then((json) =>{
            const links = json.data.map((obj:any) => ({ title: obj.attributes.title, url: obj.attributes.url }));
            const result = [{ title: 'Submit Request and Reports', links }];
            setSubmitandRequestData(result);
          });
        }else{
          console.log(`status code: ${res.status}`);
        }
      }).catch((e) =>{
        console.log(e);
      })
    };

    fetchCalendarData();
    fetchTweetData();
    fetchUpdateData();
    fetchGetInvolvedData();
    fetchGetSubmitRequestData();
  }, []);

  //create object to pass as props to Calendar component
  const passCalendarData = {
    data: calendarData,
  };
  const passTweetData = {
    tweets: tweetData,
  };
  const passUpdateData = {
    updates: updateData,
  };

  useEffect(() => {
    // if no user is authenticated, fetch data for the default user 
    if (!auth.currentUser) {
      fetchdata();
    }
  }, [auth.currentUser, fetchdata]);

  return (
    <body>
    <div className="container">
      <LogoBar />
      {/* <Search /> */}
      {/*
	  this announcments component here will
	  probably be temporary while we figure out what to do with announcements
    */}

      <div className="mt-2 text-start heading">Announcements</div>
      <Announcement {...passTweetData} vertical={false} />
      <ViewAllAnnouncements {...passTweetData}/>

      <div className="mt-4 text-start heading">Upcoming Events</div>
      <Calendar {...passCalendarData} />
      <ViewCalendar {...passCalendarData}/>

      <div className="mt-4 my-3 pf-c-title heading text-start">Our Resources</div>

      <div className="container">
      <Button
        className="home-button px-3 py-2 mb-2"
        variant="primary"
        onClick= { () => navigate("/getresources")}
        >
        Get Resources
      </Button>
      </div>
      <Resources resources={InvolvedData}/>
      <Resources resources={SubmitandRequestData}/>
      
      <div className="mt-4 pf-c-title heading text-start">News and Updates</div>
      <Updates {...passUpdateData} vertical={false} />
      <ViewAllPosts {...passUpdateData} />
    </div>
    </body>
  );
}

export type { calData };
export type { tweetData };
export type { upData };
export { APIUrl };

export default Home;

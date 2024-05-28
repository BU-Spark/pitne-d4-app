import * as React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
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
        const res = await fetch(APIUrl + "calendars");
        const json = await res.json();
        //set the calendar data
        setCalendarData(json.data);
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
    <div className="container">
      <LogoBar />
      <Search />

      {/*
	  this announcments component here will
	  probably be temporary while we figure out what to do with announcements
    */}

      <div className="mt-3 text-start heading">Announcements</div>
      <Announcement {...passTweetData} vertical={false} />
      <ViewAllAnnouncements {...passTweetData}/>

      <div className="mt-3 text-start heading">Happening This Week</div>
      <Calendar {...passCalendarData} />
      <ViewCalendar {...passCalendarData}/>

      <div className="my-3 pf-c-title heading text-start">You Pinned</div>
      <Pinned pinned={pinned} />

      <div className="my-3 pf-c-title heading text-start">Our Resources</div>
      <Button
        className="px-3 py-2 mb-2 pinned "
        variant="primary"
        onClick= { () => navigate("/getresources")}
        >
        Get Resources
      </Button>
      <Resources resources={InvolvedData}/>
      <Resources resources={SubmitandRequestData}/>
      
      <div className="mt-3 pf-c-title heading text-start">News and Updates</div>
      <Updates {...passUpdateData} vertical={false} />
      <ViewAllPosts {...passUpdateData} />
    </div>
  );
}

export type { calData };
export type { tweetData };
export type { upData };
export { APIUrl };

export default Home;

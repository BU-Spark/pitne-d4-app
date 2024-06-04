import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./screens/Welcome.tsx";
import AddressInfo from "./screens/AdressInfo.tsx";
import Register from "./screens/Register.tsx";
import AddressVerify from "./screens/AddressVerify.tsx";
import Login from "./screens/Login.tsx";
import UserProfileScreen from "./screens/Profile.tsx";
import Interests from "./screens/Interests.tsx";
import Home from "./screens/Home.tsx";
import Portal from "./screens/Portal.tsx";
import AllPosts from "./screens/AllPosts.tsx";
import GetResources from './screens/GetResources.tsx';
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";
import AllAnnouncements from "./screens/AllAnnouncements.tsx";
import AllEvents from "./screens/AllEvents.tsx";
// init firebase app
import { initializeApp } from "firebase/app";
import { config } from "./config/config.ts";

initializeApp(config.firebaseConfig);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Register/>} />
          {/* <Route path="/home" element={<Home/>} /> */}
          <Route path="/" element={<Home/>} />
          <Route path="/address-info" element={<AddressInfo/>} />
          <Route path="/address-entry" element={<AddressVerify/>} />
          <Route path="/profile" element={<UserProfileScreen/>} />
          <Route path="/interests" element={<Interests/>} />
          <Route path="/portal" element={<Portal/>} /> 
          <Route path="/getresources" element={<GetResources/>} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/all-announcements" element={<AllAnnouncements/>} />
          <Route path="/all-events" element={<AllEvents/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

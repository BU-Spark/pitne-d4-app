import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./screens/Welcome";
import AddressInfo from "./screens/AddressInfo";
import Register from "./screens/Register";
import Login from "./screens/Login";
import UserProfileScreen from "./screens/Profile";
import Interests from "./screens/Interests";
import Home from "./screens/Home";
import Portal from "./screens/Portal";
import AllPosts from "./screens/AllPosts";
import GetResources from './screens/GetResources';
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";
import AllAnnouncements from "./screens/AllAnnouncements";
import AllEvents from "./screens/AllEvents";
import CivicAssociations from "./screens/CivicAssociations";
import AddressEntry from "./screens/AddressEntry";

// init firebase app
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import DownloadApp from "./screens/downloadApp";
import DevelopmentsPage from "./screens/AllDevelopment";

initializeApp(config.firebaseConfig);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfileScreen />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/getresources" element={<GetResources />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/all-announcements" element={<AllAnnouncements />} />
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/address-info" element={<AddressInfo />} />
          <Route path="/address-entry" element={<AddressEntry />} />
          <Route path="/civic-associations" element={<CivicAssociations />} />
          <Route path="/downloadApp" element={<DownloadApp/>} />
          <Route path="/all-developments" element={<DevelopmentsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

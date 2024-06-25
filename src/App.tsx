import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddressInfo from "./screens/AddressInfo";
import Home from "./screens/Home";
import GetResources from './screens/GetResources';
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";
import AllAnnouncements from "./screens/AllAnnouncements";
import AllEvents from "./screens/AllEvents";
import CivicAssociations from "./screens/CivicAssociations";
import AddressEntry from "./screens/AddressEntry";
import CivicAssociationsInfo from "./screens/CivicAssociationsInfo";
import ClientInfo from "./screens/ClientInfo";

// init firebase app
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import DownloadApp from "./screens/downloadApp";
import DevelopmentsPage from "./screens/AllDevelopment";
import NonEmergencyForms from "./screens/311Forms";

import ScrollToTop from './components/ScrollToTop';

initializeApp(config.firebaseConfig);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-resources" element={<GetResources />} />
          <Route path="/all-announcements" element={<AllAnnouncements />} />
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/address-info" element={<AddressInfo />} />
          <Route path="/address-entry" element={<AddressEntry />} />
          <Route path="/civic-associations-info" element={<CivicAssociationsInfo />} />
          <Route path="/civic-associations" element={<CivicAssociations />} />
          <Route path="/downloadApp" element={<DownloadApp />} />
          <Route path="/all-developments" element={<DevelopmentsPage />} />
          <Route path="/311Forms" element={<NonEmergencyForms />} />
          <Route path="/client-info" element={<ClientInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

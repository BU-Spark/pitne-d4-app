import React, { useEffect } from "react";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";
import type { announData } from "./Home";
import { APIUrl } from "./Home";
import LogoBar from "../components/home/LogoBar";
import Announcements from "../components/home/announcements/Announcement";
import { doc, getDoc, getFirestore, collection, getDocs} from "firebase/firestore";

function CivicAssociationsAbout() {
  return (
    <div className="container">
      <div className = "mb-5">
      <LogoBar />
      </div>
    
      <div className="top-heading">About Civic Associations</div>
    </div>
  );
}

export default CivicAssociationsAbout;

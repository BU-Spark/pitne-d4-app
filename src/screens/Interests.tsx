import React, { useEffect, useState } from "react";
import { Button, Chip } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
// Import firebase
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { ProgressStepperCompact4 } from "../components/home/Progressbar";
import { APIUrl } from "./Home";

import { IResource } from "../types";
import { getAuth } from "firebase/auth";

interface IInterest {
  title: string;
  selected: boolean;
};

function Interests() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

    // Store the chips in state
    const [chips, setChips] = useState<{ interests: IInterest[] }>({
      interests: []
    });
  
    // Create an array of strings to store the selected chips
    const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const navigateToNext = () => {
    // Loop through the chips and add the selected chips to the selectedChips array
    const userEmail = auth.currentUser?.email || "defaultuser@email.com";
    
    chips.interests.forEach((interest) => {
      if (interest.selected) {
        let newSelectedChips = selectedChips;
        newSelectedChips.push(interest.title);
        setSelectedChips(newSelectedChips);
      }
    });
    
    // Add a new document in collection "user-profile"
    const userProfileRef = doc(db, "user-profile", userEmail);
    setDoc(userProfileRef, {
      interests: selectedChips
    },{merge: true}); 
      //merge existing contents with newly provided data, if merge = false, interests will override firstName, lastName
    
    
    navigate("/login");

  };

  const highlightItem = (title: string) => {
    // Flip the chip selected boolean
    const newChips = chips.interests.map((interest) => {
      if (interest.title === title) {
        interest.selected = !interest.selected;
      }
      return interest;
    });

    // Update the chips state
    setChips({ interests: newChips });
  };

  useEffect(() => {
    // fetches resource-lists to use the category
    const fetchResourceData = async () => {
      try {
        const res = await fetch(APIUrl + "resource-lists");
        const json = await res.json();
        let jsonData = json.data.map((resource: IResource) => resource);
        
        // only extract unique categories
        const categoryTitles = Array.from(
          new Set(jsonData.map((resource: IResource) => resource.attributes.category))
        );

        
        // format the category so that it can be used in button and highlightItem function
        const formattedChips = categoryTitles.map((title) => ({
          title: title as string,
          selected: false,
        }));

        // Update the chips state
        setChips({interests: formattedChips});
      } catch (error) {
        console.error(error);
      }
    };

    fetchResourceData();
  }, []);

  return (
    <div className="container-padded">
      <ProgressStepperCompact4/>
      <div className="pf-c-title mb-3 h5 mt-5">
        Help Us Understand Your Interests
      </div>
      <div className="mb-2">You can always change this later</div>

      {chips.interests.map((interest, index) => {
        return (
          <Chip
            key={index}
            className={
              interest.selected
                ? "px-3 m-1 selected-chip-clicked"
                : "px-3 m-1 selected-chip-non-clicked"
            }
            onClick={() => highlightItem(interest.title)}
            isReadOnly
            isOverflowChip
          >
            {interest.title}
          </Chip>
        );
      })}

      <Button
        onClick={navigateToNext}
        className="px-5 py-1 mt-4"
        variant="primary"
      >
        Finish Set Up
      </Button>
    </div>
  );
}

export default Interests;

import React, { useState } from "react";
import { Button, Modal } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import EventForm from "./AddEventForm.tsx";

function ViewAllEvents() 
{  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        setIsModalOpen(false);
    };

  return (
    <div className="container" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
      }}>
      <Button className="px-3 py-2 mb-2 pinned pf-u-text-center" variant="primary"
        onClick={() => handleButtonClick()}
      >
        Add Event!
      </Button>
      <Modal 
      title = "Add Event!" 
      isOpen={isModalOpen} 
      onClose={closeModal}> 

    <EventForm onSubmit={handleSubmit}/>

      </Modal>
    </div>
  );
}

export default ViewAllEvents;
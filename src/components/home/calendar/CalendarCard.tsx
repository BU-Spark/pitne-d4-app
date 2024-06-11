import * as React from "react";
import { Card, Text } from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "../Modal";
import useModal from "../useModal";
import './CalendarCard.css';

interface CalendarCardProps {
  title: string;
  content: string;
  image?: string;
  date?: string;
  location?: string;
}

function CalendarCard(props: CalendarCardProps) {
  const { title, content, image, date = "", location = "" } = props;
  const { isOpen, toggle } = useModal();

  return (
    <Card onClick={toggle} className="ms-1 me-3 my-3 calendar-card">
      <div className="mx-3 mt-3 mb-5">
        <Text className="text-start">{title}</Text>
        <div className="row mt-2">
          <small className="text-start text-secondary">
            {"Location: " + location}
          </small>
          {/* <small className="text-start text-secondary calendar-card-content">
            {content}
          </small> */}
          {/* {image && (
            <img
              src={image}
              alt="Event Image"
              style={{ width: "100%", height: "100%" }}
            />
          )} */}
        </div>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          title={title}
          date={date}
          content={content}
          image={image}
          location={location}
        />
      </div>
    </Card>
  );
}

export default CalendarCard;

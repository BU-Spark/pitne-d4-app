import * as React from "react";
import { Card, Text, Icon} from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";
import { EllipsisVIcon } from "@patternfly/react-icons";
import Modal from "../Modal";
import useModal from "../useModal";
import './CalendarCard.css';

//date and image is optional for now
function CalendarCard(props: {
  title: string;
  content: string;
  image?: string;
  date?: string;
  location?: string;
}) {
  const title = props.title;
  const content = props.content;
  const date = props.date ? props.date : "";
  const location = props.location ? props.location : "";
  const { isOpen, toggle } = useModal();

  return (
    <Card onClick={toggle} className="ms-1 me-3 my-3 calendar-card">
      <div className=" mx-3 mt-3 mb-5">
          <Text className="text-start">{title}</Text>
          
          <div className="col-1">
          </div>
        <div className="row mt-2 ">
          {location && <small className="text-start text-secondary">{"Location: " + location}</small>}

          {props.image ? (
            <img
              src={props.image}
              alt="Event Image"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <div></div>
          )}
        </div>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          title={title}
          date={date}
          content={content}
          location={location}
        ></Modal>
      </div>
    </Card>
  );
}

export default CalendarCard;

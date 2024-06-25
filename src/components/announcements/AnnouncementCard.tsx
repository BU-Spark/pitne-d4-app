import * as React from "react";
import { Card, Text, Icon } from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from '../Modal';
import useModal from '../useModal';

function AnnouncementCard(props: {
  title: string;
  description: string;
  date?: string;
  image?: string;
}) {
  const title = props.title;
  const content = props.description;
  const date = props.date ? props.date : "";
  const { isOpen, toggle } = useModal();

  const dateTimeString = date;
  const [dateTime, timeWithZ] = dateTimeString.split("T");
  const time = timeWithZ ? timeWithZ.replace("Z", "") : "";
  const finalDate = dateTime;

  return (
    <div onClick={toggle}>
      <Card className="ms-1 me-3 my-3 calendar-card">
        <div className="mx-3 mt-3 mb-5">
          <div className="row">
            <Text className="text-start">{title}</Text>
          </div>
          <div className="row">
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
          <div className="row">
            <small className="text-muted" style={{ marginTop: "10px", color: "#152d5c", fontStyle: "italic", textAlign: "left" }}>
              Click to see details
            </small>
          </div>
        </div>
        <Modal isOpen={isOpen} toggle={toggle} title={title} date={finalDate} content={content}>
        </Modal>
      </Card>
    </div>
  );
}

export default AnnouncementCard;

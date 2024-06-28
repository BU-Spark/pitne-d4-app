import * as React from "react";
import { Card, Text, Button } from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";
import { EllipsisVIcon } from "@patternfly/react-icons";
import Modal from '../Modal';
import UseModal from '../UseModal';

function DevelopmentCard(props: {
  title: string;
  body: string;
  website?: string;
  date?: string;
}) {
  const { title, body } = props;
  const website = props.website ? props.website : "";
  const date = props.date ? props.date : "";
  const { isOpen, toggle } = UseModal();

  return (
    <div onClick={toggle}>
      <Card className="ms-1 me-3 my-3 calendar-card">
        <div className="mx-3 mt-3 mb-5">
          <div className="row">
            <div className="col-10">
              <Text className="text-start">{title}</Text>
            </div>
            <div className="col-2 text-end">
              <Button variant="plain" aria-label="Options">
                <EllipsisVIcon />
              </Button>
            </div>
          </div>
          <div className="row mt-2">
            <small className="text-start text-secondary">{body}</small>
            {/* Link to the website if provided */}
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="btn btn-link mt-2">
                Visit Website
              </a>
            )}
          </div>
        </div>
        <Modal isOpen={isOpen} toggle={toggle} title={title} date={date} content={body}>
        </Modal>
      </Card>
    </div>
  );
}

export default DevelopmentCard;

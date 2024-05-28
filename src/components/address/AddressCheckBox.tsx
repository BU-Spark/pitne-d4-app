import * as React from "react";
import {
  Card,
  CardBody,
  Text,
  Icon,
} from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";

function AddressCheckBox() {
  return (
    <div>
      
      <Card >
        <div style={{backgroundColor:"#3e8635",height:"3px"}}></div>
        <CardBody className="m-3">
          <div className="row">
            <div className="col-10">
              <Text className="text-start">Success!</Text>
            </div>
            <div className="col-1">
              <Icon isInline status="success" className="text-end">
                <CheckCircleIcon />
              </Icon>
            </div>
          </div>
          <div className="row">
            <small className="text-start text-secondary">
              You are a part of Lucerne Gardens Resident Association
            </small>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddressCheckBox;

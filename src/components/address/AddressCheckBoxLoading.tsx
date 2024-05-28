import * as React from "react";
import {
  Card,
  CardBody,
  Text,
  Icon,
  Spinner,
} from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";

function AddressCheckBoxLoading() {
  return (
    <div>
      
      <Card >
        <div style={{backgroundColor:"#0066CC",height:"3px"}}></div>
        <CardBody className="m-3">
          <div className="row">
            <div className="col-10">
              <Text className="text-start">Processing...</Text>
            </div>
            <div className="col-1">
              <Icon isInline className="text-end">
              <Spinner isSVG aria-label="Contents of the basic example" />
              </Icon>
            </div>
          </div>
          
        </CardBody>
      </Card>
    </div>
  );
}

export default AddressCheckBoxLoading;

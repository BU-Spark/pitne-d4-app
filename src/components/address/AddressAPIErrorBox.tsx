import * as React from "react";
import {
  Card,
  CardBody,
  Text,
  Icon,
} from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import "bootstrap/dist/css/bootstrap.css";
// import a cross circle icon
import TimesCircleIcon from "@patternfly/react-icons/dist/esm/icons/times-circle-icon";

function AddressAPIError() {
  return (
    <div>

      <Card >
        <div style={{ backgroundColor: "#c9190b", height: "3px" }}></div>
        <CardBody className="m-3">
          <div className="row">
            <div className="col-10">
              <Text className="text-start">Sorry</Text>
            </div>
            <div className="col-1">
              <Icon isInline status="danger" className="text-end">
                <TimesCircleIcon />
              </Icon>
            </div>
          </div>
          <div className="row">
            <small className="text-start text-secondary">
              We are having trouble connecting to the map service, please try again later.
            </small>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddressAPIError;

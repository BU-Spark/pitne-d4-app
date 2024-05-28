import React from 'react';
import { ProgressStepper, ProgressStep } from '@patternfly/react-core';


/** File for storing different variation of the progress bar use at different stage of the sign up flow
 * properly more efficient to use React props, come back to fixed later
 * 
 * Address verify
 */


//this is for current -> pending -> pending -> pending
export const ProgressStepperCompact1: React.FunctionComponent = (props) => {
  return (
    <React.Fragment>
      <br />
      <ProgressStepper className="pf-c-progress-stepper pf-m-horizontal pf-m-center"> {/* add custom class and horizontal modifier */}
        <ProgressStep
          variant="info"
          id="basic-alignment-step2"
          titleId="basic-alignment-step2-title"
          aria-label="step with info"
          isCurrent
        >
        </ProgressStep>
        <ProgressStep
          variant="pending"
          id="basic-alignment-step3"
          titleId="basic-alignment-step3-title"
          aria-label="pending step"
        >
        </ProgressStep>
        <ProgressStep
          variant="pending"
          id="basic-alignment-step3"
          titleId="basic-alignment-step3-title"
          aria-label="pending step"
        >
        </ProgressStep>
        <ProgressStep
          variant="pending"
          id="basic-alignment-step3"
          titleId="basic-alignment-step3-title"
          aria-label="pending step"
        >
        </ProgressStep>
        
      </ProgressStepper>
    </React.Fragment>
  );
};
//this is for finished -> current -> pending -> pending
export const ProgressStepperCompact2: React.FunctionComponent = (props) => {
  return (
    <React.Fragment>
      <br />
      <ProgressStepper className="pf-c-progress-stepper pf-m-horizontal pf-m-center "> {/* add custom class and horizontal modifier */}
        <ProgressStep
          variant="success"
          id="basic-alignment-step1"
          titleId="basic-alignment-step1-title"
          aria-label="completed step, step with success"
        >
        </ProgressStep>
        <ProgressStep
          variant="info"
          isCurrent
          id="basic-alignment-step2"
          titleId="basic-alignment-step2-title"
          aria-label="step with info"
        >
        </ProgressStep>
        <ProgressStep
          variant="pending"
          id="basic-alignment-step3"
          titleId="basic-alignment-step3-title"
          aria-label="pending step"
        >
        </ProgressStep>
        <ProgressStep
          variant="pending"
          id="basic-alignment-step3"
          titleId="basic-alignment-step3-title"
          aria-label="pending step"
        >
        </ProgressStep>
        
      </ProgressStepper>
    </React.Fragment>
  );
};
//this is for finished  -> finished -> current -> pending
export const ProgressStepperCompact3: React.FunctionComponent = (props) => {
  return (
    <React.Fragment>
      <br />
      <ProgressStepper className="pf-c-progress-stepper pf-m-horizontal pf-m-center "> {/* add custom class and horizontal modifier */}
        <ProgressStep
          variant="success"
          id="basic-alignment-step1"
          titleId="basic-alignment-step1-title"
          aria-label="completed step, step with success"
        >
        </ProgressStep>
        <ProgressStep
          variant="success"
          id="basic-alignment-step1"
          titleId="basic-alignment-step1-title"
          aria-label="completed step, step with success"
        >
        </ProgressStep>
        <ProgressStep
          variant="info"
          id="basic-alignment-step2"
          titleId="basic-alignment-step2-title"
          aria-label="step with info"
          isCurrent
        >
        </ProgressStep>
        <ProgressStep
          variant="pending"
          id="basic-alignment-step3"
          titleId="basic-alignment-step3-title"
          aria-label="pending step"
        >
        </ProgressStep>
        
      </ProgressStepper>
    </React.Fragment>
  );
};
//this is for finished  -> finished -> finished -> current
export const ProgressStepperCompact4: React.FunctionComponent = (props) => {
  return (
    <React.Fragment>
      <br />
      <ProgressStepper className="pf-c-progress-stepper pf-m-horizontal pf-m-center "> {/* add custom class and horizontal modifier */}
        <ProgressStep
          variant="success"
          id="basic-alignment-step1"
          titleId="basic-alignment-step1-title"
          aria-label="completed step, step with success"
        >
        </ProgressStep>
        <ProgressStep
          variant="success"
          id="basic-alignment-step1"
          titleId="basic-alignment-step1-title"
          aria-label="completed step, step with success"
        >
        </ProgressStep>
        <ProgressStep
          variant="success"
          id="basic-alignment-step1"
          titleId="basic-alignment-step1-title"
          aria-label="completed step, step with success"
          isCurrent
        >
        </ProgressStep>
        <ProgressStep
          variant="info"
          id="basic-alignment-step2"
          titleId="basic-alignment-step2-title"
          aria-label="step with info"
        >
        </ProgressStep>
        
      </ProgressStepper>
    </React.Fragment>
  );
};
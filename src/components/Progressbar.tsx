import React from 'react';
import "@patternfly/react-core/dist/styles/base.css";
import { Progress, ProgressMeasureLocation } from '@patternfly/react-core';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
  <Progress value={value} title={" "} measureLocation={ProgressMeasureLocation.inside}/>
);

export default ProgressBar;
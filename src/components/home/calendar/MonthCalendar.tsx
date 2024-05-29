// src/components/YourComponent.tsx

import React from "react";
import { CalendarMonth } from "@patternfly/react-core";
import '../../styles/MonthCalendar.css';

function MonthCalendar() {
  return (
    <div>
      <h2>District 4 Events Calendar</h2>
      <CalendarMonth className="calendar" date={new Date()} />
    </div>
  );
}

export default MonthCalendar;

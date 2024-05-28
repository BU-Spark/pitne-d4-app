// src/components/YourComponent.tsx

import React from "react";
import { CalendarMonth } from "@patternfly/react-core";
// import { MonthCalendar } from "../components/home/styles/MonthCalendar"

function MonthCalendar() {
  return (
    <div>
      <h2>District 4 Events Calendar</h2>
      <CalendarMonth className="cal" date={new Date()} />
    </div>
  );
}

export default MonthCalendar;

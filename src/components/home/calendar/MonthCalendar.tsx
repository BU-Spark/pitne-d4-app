import React, { useState } from "react";
import { CalendarMonth } from "@patternfly/react-core";
import '../../styles/MonthCalendar.css';

interface MonthCalendarProps {
  onDateChange: (date: Date) => void;
}

function MonthCalendar({ onDateChange }: MonthCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div>
      <h2>District 4 Events Calendar</h2>
      <CalendarMonth
        className="calendar"
        date={selectedDate}
        onChange={handleDateChange}
      />
      <div className="selected-date">
        Showing events on {selectedDate.toDateString()}
      </div>
    </div>
  );
}

export default MonthCalendar;

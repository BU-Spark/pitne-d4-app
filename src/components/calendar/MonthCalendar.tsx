import React, { useState } from 'react';
import type { calData } from "../../screens/Home";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  // Default CSS
import './MonthCalendar.css';  // Your custom CSS

interface MonthCalendarProps {
  onDateChange: (date: Date) => void;
  calendarData: calData[];
}

function MonthCalendar({ onDateChange, calendarData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  const dateHasEvents = (date: Date): boolean => {
    return calendarData.some(event => {
      const eventDate = new Date(event.attributes.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const renderDayContents = (dayOfMonth: number, date?: Date) => {
    const hasEvents = date ? dateHasEvents(date) : false;
    return (
      <div className='datecell'>
        {dayOfMonth}
        {hasEvents && <span className="dot-indicator">•</span>}
      </div>
    );
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        renderDayContents={renderDayContents}
      />
    </div>
  );
}

export default MonthCalendar;
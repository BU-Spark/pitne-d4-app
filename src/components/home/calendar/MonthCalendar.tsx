// import React, { useState } from "react";
// import { CalendarMonth } from "@patternfly/react-core";
// import '../../styles/MonthCalendar.css';

// interface calData {
//   id: number;
//   attributes: {
//     title: string;
//     image: string;
//     body: string;
//     date: string;
//     location: string;
//   };
// }

// interface MonthCalendarProps {
//   onDateChange: (date: Date) => void;
//   calendarData: calData[];
// }

// function MonthCalendar({ onDateChange, calendarData }: MonthCalendarProps) {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());

//   const handleDateChange = (newDate: Date) => {
//     setSelectedDate(newDate);
//     onDateChange(newDate);
//   };

//   const dateHasEvents = (date: Date): boolean => {
//     return calendarData.some(event => {
//       const eventDate = new Date(event.attributes.date);
//       return eventDate.toDateString() === date.toDateString();
//     });
//   };

//   // Display a visual cue if the selected date has events
//   const EventIndicator = () => (
//     <div>
//       {dateHasEvents(selectedDate) && (
//         <div style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>
//           Events are scheduled for this date!
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div>
//       <CalendarMonth
//         className="calendar"
//         date={selectedDate}
//         onChange={handleDateChange}
//       />
//       <div className="calendar-text">
//         Events on {selectedDate.toDateString()}:
//       </div>
//       <EventIndicator />
//     </div>
//   );
// }

// export default MonthCalendar;

import React, { useState } from 'react';
import type { calData } from "../../../screens/Home";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  // Default CSS
import '../../styles/MonthCalendar.css';  // Your custom CSS

interface MonthCalendarProps {
  onDateChange: (date: Date) => void;
  calendarData: calData[];
}

function MonthCalendar({ onDateChange, calendarData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
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
      <div className="calendar-text">
        Events on {selectedDate.toDateString()}:
      </div>
    </div>

  );
}

export default MonthCalendar;
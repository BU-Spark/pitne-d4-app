import * as React from "react";
import CalendarCard from "./CalendarCard";
import DatePicker from "./DatePicker";
//import calData type
import type {calData} from '../../../screens/Home';
import '../../styles/CalendarEvents.css';

interface EventsProps {
    data: calData[];
    scrollDirection: 'horizontal' | 'vertical';
  }
  
// Shows event data/all calendar cards
function Events({ data, scrollDirection }: EventsProps) {
  return (
    <div>
      <div className={`scroll-container ${scrollDirection}-scroll`} style={{ marginLeft: 15 }}>
        {data.length > 0 ? (
          data.map((event) => (
            <CalendarCard
              key={event.id}
              title={event.attributes.title}
              content={event.attributes.body}
              date={event.attributes.date}
              time={event.attributes.time}
              location={event.attributes.location}
            />
          ))
        ) : (
          <CalendarCard
            title="No Scheduled Events"
            content="Check back later!"
          />
        )}
      </div>
    </div>
  );
}

export default Events;

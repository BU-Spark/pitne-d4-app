import * as React from "react";
import CalendarCard from "./CalendarCard";
//import calData type
import type { calData } from '../../screens/Home';
import './CalendarEvents.css';


// Shows event data/all calendar cards
function Events(props: { data: calData[] }) {
    const data = props.data;

    return (
        <div>
            <div className="horizontal-scroll" style={{ marginLeft: 15 }}>
                {data.length > 0 ? (
                    data.map((event) => {
                        return (
                            <CalendarCard
                                title={event.attributes.title}
                                content={event.attributes.body}
                                date={event.attributes.date}
                                time={event.attributes.time}
                                location={event.attributes.location}
                            ></CalendarCard>
                        );
                    })
                ) : (
                    <CalendarCard
                        title="No Scheduled Events"
                        content="Check back later!"
                    ></CalendarCard>
                )}
            </div>
        </div>
    )
}

export default Events;

import * as React from "react";
import CalendarCard from "./CalendarCard";
import DatePicker from "./DatePicker";
//import calData type
import type {calData} from '../../../screens/Home';
import '../../styles/CalendarEvents.css';


// Shows event data/all calendar cards
function Events(props: {data: calData[]}) {
    const data = props.data;
    return (
        <div>
            <div className="horizontal-scroll">
                {data.length > 0 ? (
                    data.map((event) => {
                        return (
                            <CalendarCard
                                title={event.attributes.title}
                                content={event.attributes.body}
                                date={event.attributes.date}
                                location={event.attributes.location}
                            ></CalendarCard>
                        );
                    })
                ) : (
                    <CalendarCard
                        title="No Events"
                        content="Check back later!"
                    ></CalendarCard>
                )}
            </div>
        </div>
    )
}

export default Events;

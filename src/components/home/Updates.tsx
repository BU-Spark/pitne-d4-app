import * as React from "react";
import CalendarCard from "./calendar/CalendarCard.tsx";
import type { upData } from "../../screens/Home.tsx";
function Updates(props: { updates: upData[]; vertical: boolean }) {
  return (
    <div className={props.vertical ? "vertical-scroll" : "horizontal-scroll"}
    style={
      props.vertical ? {display: "flex", flexWrap: "wrap"} : {}} >
      {props.updates[0] && props.updates[0].id === -1 ? (
        <CalendarCard
          title="Uh Oh!"
          content="Looks like there was an issue!"
        ></CalendarCard>
      ) : props.updates && props.updates.length > 0 ? (
        props.updates.map((update) => {
          return (
            <CalendarCard
              title={update.attributes.title}
              content={update.attributes.content}
            ></CalendarCard>
          );
        })
      ) : (
        <CalendarCard
          title="No Updates"
          content="Check back later!"
        ></CalendarCard>
      )}
    </div>
  );
}

export default Updates;

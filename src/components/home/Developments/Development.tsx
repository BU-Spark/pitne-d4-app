import * as React from "react";
import DevelopmentCard from "./DevelopmentCard";
import type { DevelopmentData } from "../../../screens/Home";

function DevelopmentUpdates(props: { developments: DevelopmentData[]; vertical: boolean }) {
  return (
    <div className={props.vertical ? "vertical-scroll" : "horizontal-scroll"}
      style={props.vertical ? { display: "flex", flexWrap: "wrap" } : {}}>
      {props.developments.length > 0 ? (
        props.developments.slice().reverse().map((development) => (
          <DevelopmentCard
            key={development.id}
            title={development.attributes.title}
            body={development.attributes.body}
            website={development.attributes.website}
            date={development.attributes.date}
          />
        ))
      ) : (
        <DevelopmentCard
          title="No Developments"
          body="Check back later!"
        />
      )}
    </div>
  );
}

export default DevelopmentUpdates;

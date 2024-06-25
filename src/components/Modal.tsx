import React, { ReactNode } from "react";
import { Text } from "@patternfly/react-core";


interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  title: string;
  content: string;
  date: string;
  time?: string;
  location?: string;
}

export default function Modal(props: ModalType) {
  let realDate = props.date;
  let day = realDate.substring(5, 7) + "/" + realDate.substring(8, 10) + "/" + realDate.substring(2, 4);
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <button onClick={props.toggle} className="closeModal">X</button>
            <div className="modal-wrapper">
              <p><b>{props.title}</b></p>
              {props.date && (<Text>
                <b>Date: </b>{day}
              </Text>)}

              {props.location && (<Text>
                <b>Location: </b>{props.location}
              </Text>)}

              {props.date && (<Text>
                <b>When: </b>{props.time}
              </Text>)}

              <p className="modal-text">
                {props.content}
              </p>


            </div>
          </div>
        </div>
      )}
    </>
  );
}
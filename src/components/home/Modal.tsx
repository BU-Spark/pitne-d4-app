import React, { ReactNode } from "react";
import { Text } from "@patternfly/react-core";


interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  title: string;
  date: string;
  location?: string;
  content: string;
}

export default function Modal(props: ModalType) {
  console.log(props.content)
  console.log(props.date)
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
          <button onClick={props.toggle} className="closeModal">X</button>
            <div className="modal-wrapper">
              <p><b>{props.title}</b></p>
              <Text>
                <b>Date: </b>{props.date}
              </Text>
              {props.location && (<Text>
                <b>Where: </b>{props.location}
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
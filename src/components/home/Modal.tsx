import React, { ReactNode, useState } from "react";
import { Text } from "@patternfly/react-core";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  title: string;
  content: string;
  image?: string;
  date: string;
  time?: string;
  location?: string;
}

export default function Modal(props: ModalType) {
  const [isFullSize, setIsFullSize] = useState(false);

  const toggleImageSize = () => {
    setIsFullSize(!isFullSize);
  };

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
              {props.location && (
                <Text>
                  <b>Where: </b>{props.location}
                </Text>
              )}
              {props.time && (
                <Text>
                  <b>When: </b>{props.time}
                </Text>
              )}
              
              <p className="modal-text">
                {props.content}
              </p>
              {props.image && (
                <div className="modal-image">
                  <img
                    src={props.image}
                    alt={props.title}
                    className={isFullSize ? "full-size" : ""}
                    onClick={toggleImageSize}
                  />

                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

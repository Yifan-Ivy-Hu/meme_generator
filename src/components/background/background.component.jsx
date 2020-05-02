import React from "react";
import "./background.styles.css";

export default function background(props) {
  return (
    <div className="background" style={{backgroundImage: `url(${props.image})` }}>
      {props.children}
    </div>
  )
}
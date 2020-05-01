import React from "react";
import "./title.styles.css"

export default function title(props) {
  return (
    <h1 className="title">{props.text}</h1>
  )
}
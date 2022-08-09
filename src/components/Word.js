import React from "react";
import "./Word.css"
import { memo } from "react";

const Word = ({word, active, correct, rerender}) => {

  if (correct === true) {
    return <span className="correct">{word} </span>
  }

  if (correct === false) {
    return <span className="incorrect">{word} </span>
  }

  if (active) {
    return <span className="active">{word} </span>
  }

  return <span>{word} </span>

}

export default memo(Word)
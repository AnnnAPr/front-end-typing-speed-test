import React from "react";
import PropTypes from "prop-types";
import "./Word.css"
import { memo } from "react";

const Word = ({word, active, correct}) => {

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

Word.propTypes = {
  word: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  correct: PropTypes.bool.isRequired,
};

export default memo(Word)
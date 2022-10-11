import React from "react";
import PropTypes from "prop-types";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({key, setIsDisabled, timerActive, SECONDS, setIsOpenEndModal}) => {

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setIsDisabled(true)
      setIsOpenEndModal(true)
      return <div className="timer" style={{fontSize: 25}}><b style={{fontSize: 25}}>Completed</b></div>;
    }
  
    return (
      <div className="timer">
        <div className="value" style={{fontSize: 50}}><b>{remainingTime}</b></div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        key={key}
        isPlaying={timerActive}
        duration={SECONDS}
        colors={["#228B22", "#FF5F1F", "#1F51FF", "#A30000"]}
        // colorsTime={[3, 2, 1, 0]}
        // colors={["#AAFF00", "#E983D8", "E4D00A", "FF0000"]}
        // colorsTime={[10, 6, 3, 0]}
        colorsTime={[60, 40, 20, 0]}
        onComplete={() => ({ shouldRepeat: false, isOpenEndModal: true })}
      >
        {renderTime}
      </CountdownCircleTimer>
      </div>
  )
}

Timer.propTypes = {
  key: PropTypes.number.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
  timerActive: PropTypes.bool.isRequired,
  SECONDS: PropTypes.number.isRequired,
  setIsOpenEndModal: PropTypes.func.isRequired,
};

export default Timer
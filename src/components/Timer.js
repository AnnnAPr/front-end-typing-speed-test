import React from "react";
// import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import EndModal from "./EndModal";


const Timer = ({key, setIsDisabled, timerActive, SECONDS, isOpenEndModal, setIsOpenEndModal}) => {

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
        colors={["#FF5F1F", "#FFF01F", "#E4D00A", "#A30000"]}
        // colors={["#AAFF00", "#E983D8", "E4D00A", "FF0000"]}
        colorsTime={[15, 9, 4, 0]}
        // colorsTime={[10, 6, 3, 0]}
        // colorsTime={[45, 20, 10, 0]}
        onComplete={() => ({ shouldRepeat: false, isOpenEndModal: true })}
      >
        {renderTime}
      </CountdownCircleTimer>
      </div>
  )
}

export default Timer
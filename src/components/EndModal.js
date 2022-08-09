import React from "react";
import "./EndModal.css"
import turtle from "../images/turtle.jpg"
// import otter from "../images/otter.jpg"
import whale from "../images/whale.jpg"
import shark from "../images/shark.jpg"

const EndModal = ({isOpenEndModal, saveScore, id, correctWords, restart, allWords, focusInput}) => {

  let img = () => {
    if (correctWords < 4) {
      return turtle
    } else if (correctWords >= 4 && correctWords < 6) {
      return whale
    } else if (correctWords >= 6 ) {
      return shark
    } 
  }

  let personality = () => {
    if (correctWords < 4) {
      return "turtle"
    } else if (correctWords >= 4 && correctWords < 6) {
      return "whale"
    } else if (correctWords >= 6 ) {
      return "shark"
    } 
  }

  return (
    <div className="createModal">
        {isOpenEndModal && (
          <>
            <div className="modal-bgr">
              <div className="mod2">
                <button onClick={() => {restart(); focusInput()}} className="close-button">&times;</button>
                <div>
                  <h2>{correctWords < 4 ? "Well..." : ""} You are <u>{personality()}</u></h2>
                  <div className="img">
                    <img src={img()} alt={personality()}/>
                  </div>
                  <p>Your typing speed is <b>{correctWords}</b> correct words/min</p>
                  <p>Your accuracy is <b>{Math.round((correctWords / allWords) * 100) || 0}</b>%</p>
                  <div className="btnSave">
                    <button type="button" className="btn btn-secondary"
                          onClick={() => saveScore(id)}
                          disabled={correctWords===0}
                    >
                      Save my result
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default EndModal
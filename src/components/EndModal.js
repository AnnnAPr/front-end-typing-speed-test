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
                  {/* <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Your name</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name" />
                      <small id="emailHelp" class="form-text text-muted">Form is active if scores not zero</small>
                    </div>
                  </form> */}
                  <form class="row g-3">
                    <div class="col-auto">
                      <label for="staticEmail2" class="visually-hidden">Your name</label>
                      <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="Your name"/>
                    </div>
                    <div class="col-auto">
                      <label for="inputPassword2" class="visually-hidden">Name</label>
                      <input type="password" class="form-control" id="inputPassword2" placeholder="TOTOT"/>
                    </div>
                    <div class="col-auto">
                      <button type="submit" class="btn btn-primary mb-3">Save my result</button>
                    </div>
                  </form>
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
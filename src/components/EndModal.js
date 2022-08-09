import React from "react";
import { useState } from "react";
import "./EndModal.css"
import turtle from "../images/turtle.jpg"
// import otter from "../images/otter.jpg"
import whale from "../images/whale.jpg"
import shark from "../images/shark.jpg"

const EndModal = ({isOpenEndModal, saveScore, id, correctWords, restart, allWords, focusInput, addNameScore}) => {
  const [newName, setNewName] = useState({name: ''});
  console.log("New name", newName)
  console.log("Scores", correctWords)

  const handleChange = (event) => {setNewName({name: event.target.value})}

  const addName = (e) => {
    e.preventDefault();
    addNameScore(id, newName, correctWords)
    setNewName({name: ''})
  }

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
                  
                  <form onSubmit={addName}>
                    <div class="form-group">
                      <label for="name">Enter your name to save result</label>
                      <input type="text" class="form-control w-50" id="name" placeholder={correctWords === 0 ? "not active" : "Name"}
                            disabled={correctWords === 0 ? true : false}
                            maxLength={10} required
                            value={newName.name}
                            onChange={handleChange}
                      />
                      <small class="form-text text-muted">Form is active if correct words not zero</small>
                      <input type="submit" value="Save my result" disabled={correctWords===0}/>
                    </div>
                  </form>
                  {/* <div className="btnSave">
                    <button type="button" className="btn btn-secondary"
                          onClick={() => saveScore(id)}
                          disabled={correctWords===0}
                    >
                      Save my result
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default EndModal
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./EndModal.css"
// import turtle from "../images/turtle.jpg"
import whale from "../images/whale.jpg"
import shark from "../images/shark.jpg"
import starfish from "../images/starfish.jpg"
// import starfish from "../images/starfish.png"

const EndModal = ({isOpenEndModal, id, correctWords, restart, allWords, focusInput, addNameScore}) => {
  const [newName, setNewName] = useState({name: ''});
  const handleChange = (event) => {setNewName({name: event.target.value.replace(/[^A-Za-z0-9]/gi, '')})}
  const addName = (e) => {
    e.preventDefault();
    addNameScore(id, newName, correctWords)
    setNewName({name: ''})
  }

  let img = () => {
    if (correctWords < 25) {
    // if (correctWords < 3) {
      return starfish
    } else if (correctWords >= 25 && correctWords < 50) {
    // } else if (correctWords >= 3 && correctWords < 6) {
      return whale
    } else if (correctWords >= 50 ) {
    // } else if (correctWords >= 6 ) {
      return shark
    } 
  }

  let personality = () => {
    if (correctWords < 25) {
      // if (correctWords < 3) {
      return "starfish"
    } else if (correctWords >= 25 && correctWords < 50) {
    // } else if (correctWords >= 3 && correctWords < 6) {
      return "whale"
    } else if (correctWords >= 50 ) {
    // } else if (correctWords >= 6 ) {
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
                  <p>Your typing speed is <u><b>{correctWords}</b></u> correct words/min</p>
                  <p>Your accuracy is <u><b>{Math.round((correctWords / allWords) * 100) || 0}</b>%</u></p>
                  <form onSubmit={addName}>
                    <div class="form-group">
                      <label htmlFor="name">Enter your name to save result</label>
                      <input type="text" class="form-control w-50" id="name" placeholder={correctWords === 0 ? "...not active" : "Name"}
                            disabled={correctWords === 0 ? true : false}
                            maxLength={10} required
                            value={newName.name}
                            onChange={handleChange}
                      />
                      <small class="form-text text-muted">Form is active if correct words not zero</small>
                      <input type="submit" value="Save my result" disabled={correctWords===0}/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

EndModal.propTypes = {
  isOpenEndModal: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  correctWords: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired,
  allWords: PropTypes.number.isRequired,
  focusInput: PropTypes.func.isRequired,
  addNameScore: PropTypes.func.isRequired,
};

export default EndModal
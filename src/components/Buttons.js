import React from "react"

const Buttons = ({restart, pressBestScore, saveScore, id, correctWords}) => {
  return (
    <div className="dataButtons">
  <div className="buttons">
    <button type="button" className="btn btn-secondary" onClick={restart}>Restart</button>
    <button type="button" className="btn btn-secondary"
            onClick={() => saveScore(id)}
            disabled={correctWords===0}
            >Save my result</button>
    <button type="button" className="btn btn-secondary" onClick={pressBestScore}>
        Best score
    </button>
  </div>
  </div>
  )
}

export default Buttons
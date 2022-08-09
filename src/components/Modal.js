import React from "react";
import BarChart from "./BarChart";
import "./Modal.css";

const Modal = ({isOpen, modalRef, closeModalOutside, bestScore, closeModal, chartData, focusInput, bestScoreName}) => {
  return (
    <div className="createModal">
        {isOpen && (
          <>
            <div className="modal-bgr" ref={modalRef} onClick={closeModalOutside}>
              <div className="mod">
                <button onClick={() => {focusInput(); closeModal()}} className="close-button">&times;</button>
                <h2 className="mod-h2">Best score: {bestScore} made by {bestScoreName}</h2> 
                  
                <div>
                  <h5>Global scores 🏆</h5>
                  <BarChart chartData={chartData}/>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default Modal
import React from "react";
import PropTypes from "prop-types";
import BarChart from "./BarChart";
import "./Modal.css";

const Modal = ({isOpen, modalRef, closeModalOutside, bestScore, closeModal, focusInput, bestScoreName, labels, data}) => {
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Num of people write",
        data: data,
        backgroundColor: "#FF5F1F",
        borderColor: "black",
        hoverBackgroundColor: "black",
        barThickness: 60,
        minBarThickness: 5
      }
    ],
  }
  
  return (
    <div className="createModal">
        {isOpen && (
          <>
            <div className="modal-bgr" ref={modalRef} onClick={closeModalOutside}>
              <div className="mod">
                <button onClick={() => {focusInput(); closeModal()}} className="close-button">&times;</button>
                <h2 className="mod-h2">Best score: <u>{bestScore}</u> made by <u>{bestScoreName}</u></h2> 
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

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModalOutside: PropTypes.func.isRequired,
  bestScore: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  bestScoreName: PropTypes.string.isRequired,
  focusInput: PropTypes.func.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  data: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default Modal
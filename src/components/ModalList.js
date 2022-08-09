import React from "react";
import BarChart from "./BarChart";
import "./Modal.css";
import "./ModalList.css";

const ModalList = ({isOpenML, closeModalList, listOfSamples, modalRef1, closeModalListOutside, finalLabels}) => {
  const chart = sample => {
    const scoreFrequency = {}
    // sample.scores.forEach(data => {
    //   scoreFrequency[data.score] = (scoreFrequency[data.score] || 0) + 1
    // })
    sample.scores.forEach(score => {
      scoreFrequency[score] = (scoreFrequency[score] || 0) + 1
    })

    const labelData = finalLabels(Object.keys(scoreFrequency))

    const barData = {
      labels: labelData,
      datasets: [
            {
              label: "Num of people",
              data: Object.values(scoreFrequency),
              backgroundColor: "#FF5F1F",
              borderColor: "black",
              hoverBackgroundColor: "black",
              barThickness: 60,
              minBarThickness: 10
            }
      ]
    }
    console.log("BAR DATA", barData)

    return barData

  }

  const chartsList = () => {           
    const charts = listOfSamples.map(sample => {

      const chartData = chart(sample)
      console.log("TITLE", sample.title)
      
      return (
        <div>
          <h5>{sample.title}</h5>
          <BarChart chartData={chartData}/>
        </div>
      )
  })

  console.log("CHARTS", charts)
  return charts

}

  return (
    <div className="createModal">
      
        {isOpenML && (
          <>
            <div className="modal-bgr" ref={modalRef1} onClick={closeModalListOutside}>
              <div className="mod1">
                <button onClick={closeModalList} className="close-button">&times;</button>
                {chartsList()}
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default ModalList
import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";
import Chart from "chart.js/auto";  // charts are not shown without this line

const BarChart = ({chartData}) => {
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false
        },
        grid: {
          drawBorder: false,
          display: false
        }
      }
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options}/>
      <p>Number of words per minutes</p>
    </div>
  
  )
}

BarChart.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default BarChart
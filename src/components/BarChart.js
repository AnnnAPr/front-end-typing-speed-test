import React from "react";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.register(ChartDataLabels);

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
    // plugins: {
    //   datalabels: {
    //     labels: {
    //       title: {},
    //       value: "w/m"
    //     }
    //   }
    // }
  };

  return (
    <div>
      <Bar data={chartData} options={options}/>
      <p>Number of words per minutes</p>
    </div>
  
  )
}

export default BarChart
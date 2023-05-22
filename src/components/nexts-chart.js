import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

export default function NextsChart({ data: { nexts } }) {
  console.log(nexts)



  const data = {
    labels: nexts.map(next => next.next.toDateString()),
    datasets: [
      {
        data: nexts.map(next => next.amount),
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      }
    ]
  }

  const options = {

    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    },
  }
  return <>
    <Bar
      data={data} options={options}
    />

  </>
}

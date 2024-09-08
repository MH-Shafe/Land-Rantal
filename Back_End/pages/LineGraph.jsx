// LineGraph.jsx
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = () => {
  const chartRef = useRef();

  useEffect(() => {
    const data = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4','Day 5', 'Day 6'],
      datasets: [
        {
          label: 'User Increase Records',
          data: [1, 8, 12, 15,23,30,29,],
          fill: false,
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 2,
          pointRadius: 5,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');

    // Check if a chart instance exists
    if (chartRef.current.chart) {
      // Destroy the previous chart before creating a new one
      chartRef.current.chart.destroy();
    }

    // Create a new chart
    chartRef.current.chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }, []);

  return (
    <div className="flex justify-center items-center p-8 w-[500px]">
      <div className="bg-white p-2 rounded shadow-md w-[500px]">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">User Increase Records</h2>
        <canvas ref={chartRef} className="w-full h-64" />
      </div>
    </div>
  );
};

export default LineGraph;

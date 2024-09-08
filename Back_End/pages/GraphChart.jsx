import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraphChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const data = {
      labels: ['Traktor', 'Pump', 'Crane', 'Product D'],
      datasets: [
        {
          label: 'Number of Sales',
          data: [10, 5, 15, 8],
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
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
      type: 'bar',
      data: data,
      options: options,
    });
  }, []);

  return (
    <div className="flex justify-center items-center p-8 w-[500px] ">
      <div className="bg-white p-2 rounded shadow-md w-[500px]">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Sales Chart for Pruduct</h2>
        <canvas ref={chartRef} className="w-full h-64" />
      </div>
    </div>
  );
};

export default GraphChart;

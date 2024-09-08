// LineGraph.jsx
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraphProduct = ({ productData }) => {
  const chartRef = useRef();
  console.log(productData)

  useEffect(() => {
    // Assuming productData is an array of objects with 'day' and 'count' properties
    const labels = productData.map((product) => product.name);
    const data = productData.map((product) => product.price);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Products Added Over Time',
          data: data,
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
      data: chartData,
      options: options,
    });
  }, [productData]);

  return (
    <div className="flex justify-center items-center p-8 w-[500px]">
      <div className="bg-white p-2 rounded shadow-md w-[500px]">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Products Added Over Time</h2>
        <canvas ref={chartRef} className="w-full h-64" />
      </div>
    </div>
  );
};

export default LineGraphProduct;

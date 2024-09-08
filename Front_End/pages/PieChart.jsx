import { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef({});

  // Declare data outside of useEffect
  const data = {
    labels: ['Traktor', 'Pump', 'Crane', 'Product D'],
    datasets: [
      {
        data: [10, 5, 15, 8],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
      },
    ],
  };

  useEffect(() => {
    const canvas = chartRef.current?.chartInstance?.canvas;

    // Ensure canvas exists before proceeding
    if (canvas) {
      const ctx = canvas.getContext('2d');

      // Destroy any existing chart on the canvas
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      // Create a new chart
      chartRef.current.chartInstance = new Chart(ctx, {
        type: 'pie',
        data: data,
      });
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center p-4"> {/* Reduced padding */}
    <div className="bg-white p-2 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Sales Distribution for Products</h2>
      <Pie ref={chartRef} data={data} width={200} height={200} /> {/* Adjust width and height as needed */}
    </div>
  </div>
  );
};

export default PieChart;

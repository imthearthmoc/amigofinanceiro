import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, PieController, CategoryScale } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, PieController, CategoryScale);

const PieChart = ({ expenses, width = 600, height = 600 }) => { // Altere os valores padrão se necessário
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const aggregateExpensesByCategory = (expenses) => {
    const categoryTotals = {};

    expenses.forEach(expense => {
      if (categoryTotals[expense.category_name]) {
        categoryTotals[expense.category_name] += expense.amount;
      } else {
        categoryTotals[expense.category_name] = expense.amount;
      }
    });

    return categoryTotals;
  };

  const aggregatedData = aggregateExpensesByCategory(expenses);

  const data = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: 'Total de Despesas',
        data: Object.values(aggregatedData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const newChart = new Chart(canvasRef.current, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    chartRef.current = newChart;
  }, [expenses]);

  return (
    <div>
      <h2 className='h2-piechart'>Grafico de Despesas</h2>
      <div className="chart-container">
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
    </div>
  );
};

export default PieChart;
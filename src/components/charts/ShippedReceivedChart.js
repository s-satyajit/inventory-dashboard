import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ShippedReceivedChart = ({ data }) => {
    const dates = [...new Set(data.map(item => item.OrderDate))];
    const shippedData = dates.map(date => {
        return data.filter(item => item.Status === 'Shipped' && item.OrderDate === date)
                    .reduce((sum, item) => sum + item.OrderItemQuantity, 0);
    });
    const receivedData = dates.map(date => {
        return data.filter(item => item.Status === 'Received' && item.OrderDate === date)
                    .reduce((sum, item) => sum + item.OrderItemQuantity, 0);
    });

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: 'Shipped',
                data: shippedData,
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.1,
            },
            {
                label: 'Received',
                data: receivedData,
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Shipped vs Received Items Over Time',
            },
        },
    };

    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ShippedReceivedChart;

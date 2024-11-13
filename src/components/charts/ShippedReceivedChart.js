import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ShippedReceivedChart = ({ data }) => {
    const dates = [...new Set(data.map(item => item.OrderDate))];
    const shippedData = dates.map(date => {
        return data.filter(item => item.Status === 'Shipped' && item.OrderDate === date)
                    .reduce((sum, item) => sum + item.OrderItemQuantity, 0);
    });
    const receivedData = dates.map(date => {
        return data.filter(item => item.Status === 'Rejected' && item.OrderDate === date)
                    .reduce((sum, item) => sum + item.OrderItemQuantity, 0);
    });

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: 'Shipped',
                data: shippedData,
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'Received',
                data: receivedData,
                borderColor: 'green',
                fill: false,
            },
        ],
    };

    return <Line data={chartData} />
};

export default ShippedReceivedChart;
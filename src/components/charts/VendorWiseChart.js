import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VendorWiseChart = ({ data }) => {
    const vendors = [...new Set(data.map(item => item.VendorName))];
    const totalOrderQuantities = vendors.map(vendor => {
        return data.filter(item => item.VendorName === vendor)
                    .reduce((sum, item) => sum + item.OrderItemQuantity, 0)
    });
    const totalAvailableQuantities = vendors.map(vendor => {
        return data.filter(item => item.VendorName === vendor)
                    .reduce((sum, item) => sum + item.AvailableQuantity, 0)
    })

    const chartData = {
        labels: vendors,
        datasets: [
            {
                label: 'Total Order Quantity',
                data: totalOrderQuantities,
                backgroundColor: 'blue',
            },
            {
                label: 'Total Available Quantity',
                data: totalAvailableQuantities,
                backgroundColor: 'green',
            },
        ],
    };

    return (

            <Bar className="bg-white p-4 shadow-lg rounded-lg" data={chartData} />
       
    )
};

export default VendorWiseChart;
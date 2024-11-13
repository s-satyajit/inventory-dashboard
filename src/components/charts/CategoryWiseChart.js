import React, {useState} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoryWiseChart = ({ data }) => {
    const categories = [...new Set(data.map(item => item.CategoryName))];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const filteredData = data.filter(item => item.CategoryName === selectedCategory);
    const totalOrderQuantities = filteredData.reduce((sum, item) => sum + item.OrderItemQuantity, 0);
    const totalAvailableQuantities = filteredData.reduce((sum, item) => sum + item.AvailableQuanity, 0);
    const shippedItems = filteredData.filter(item => item.Status === 'Shipped').length;
    const receivedItems = filteredData.filter(item => item.Status === 'Received').length;

    const chartData = {
        labels: [selectedCategory],
        datasets: [
            {
                label: 'Total Order Quantity',
                data: [totalOrderQuantities],
                backgroundColor: 'blue',
            },
            {
                label: 'Total Available Quantity',
                data: [totalAvailableQuantities],
                backgroundColor: 'green',
            },
            {
                label: 'Shipped Items',
                data: [shippedItems],
                backgroundColor: 'orange',
            },
            {
                label: 'Received Items',
                data: [receivedItems],
                backgroundColor: 'purple'
            },
        ],
    };

    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <Bar data={chartData} />
        </div>
    );
};

export default CategoryWiseChart;
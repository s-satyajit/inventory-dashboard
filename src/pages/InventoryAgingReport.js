import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryAgingReport = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const categories = [...new Set(data.map(item => item.CategoryName))];
  const products = selectedCategory ? data.filter(item => item.CategoryName === selectedCategory).map(item => item.ProductName) : [];

  const calculateAgingData = (filteredData) => {
    const today = new Date('2024-09-30');
    const agingBuckets = { '0-30': 0, '31-60': 0, '61-90': 0, '91-120': 0, '120+': 0 };

    filteredData.forEach(item => {
      const orderDate = new Date(item.OrderDate);
      const daysInStock = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));

      if (daysInStock <= 30) agingBuckets['0-30'] += item.AvaliableQuantity;
      else if (daysInStock <= 60) agingBuckets['31-60'] += item.AvaliableQuantity;
      else if (daysInStock <= 90) agingBuckets['61-90'] += item.AvaliableQuantity;
      else if (daysInStock <= 120) agingBuckets['91-120'] += item.AvaliableQuantity;
      else agingBuckets['120+'] += item.AvaliableQuantity;
    });

    return agingBuckets;
  };

  const categoryAgingData = calculateAgingData(data.filter(item => item.CategoryName === selectedCategory));
  const productAgingData = calculateAgingData(data.filter(item => item.ProductName === selectedProduct));

  const chartData = (agingData) => ({
    labels: Object.keys(agingData),
    datasets: [
      {
        label: 'Stock Quantity',
        data: Object.values(agingData),
        backgroundColor: 'blue',
      }
    ]
  });

  return (
    <div>
      <h2>Inventory Aging Report</h2>
      <div>
        <label>Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value=''>Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <Bar data={chartData(categoryAgingData)} />
      </div>
      {selectedCategory && (
        <div>
          <label>Product:</label>
          <select onChange={(e) => setSelectedProduct(e.target.value)} value={selectedProduct}>
            <option value=''>Select Product</option>
            {products.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
      )}
      {selectedProduct && (
        <div>
          <Bar data={chartData(productAgingData)} />
        </div>
      )}
    </div>
  );
};

export default InventoryAgingReport;
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShippedReceivedChart from '../components/charts/ShippedReceivedChart';
import VendorWiseChart from '../components/charts/VendorWiseChart';
import CategoryWiseChart from '../components/charts/CategoryWiseChart';
import CategoryWiseTable from '../components/tables/CategoryWiseTable';
import WarehouseWiseTable from '../components/tables/WarehouseWiseTable';

const SummaryPage = ({ data }) => {
  const [startDate, setStartDate] = useState(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState(new Date());

  const filteredData = data.filter((item) => {
    const orderDate = new Date(item.OrderDate); 

    return orderDate >= startDate && orderDate <= endDate;
  });

  console.log('Filtered Data:', filteredData);

  const totalWarehouses = new Set(filteredData.map(item => item.WarehouseName)).size;
  const totalCategories = new Set(filteredData.map(item => item.CategoryName)).size;
  const totalProducts = new Set(filteredData.map(item => item.ProductName)).size;
  const totalVendors = new Set(filteredData.map(item => item.VendorName)).size;
  const shippedItems = filteredData.filter(item => item.Status === 'Shipped').length;
  const receivedItems = filteredData.filter(item => item.Status === 'Received').length;
  const totalOrderQuantity = filteredData.reduce((sum, item) => sum + item.OrderItemQuantity, 0);
  const totalAvailableQuantity = filteredData.reduce((sum, item) => sum + item.AvailableQuantity, 0);

  return (
    <div className="p-6 bg-slate-300 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Inventory Summary</h2>
      <div className="flex items-center mb-6">
        <div className="mr-4">
          <label className="block text-sm font-medium text-gray-700">Start Date:</label>
          <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date:</label>
          <DatePicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="bg-slate-200 shadow overflow-hidden sm:rounded-lg mb-6 p-6">
        <h3 className="text-xl font-bold mb-4">Key Data Points</h3>
        <p>Total Warehouses: {totalWarehouses}</p>
        <p>Total Categories: {totalCategories}</p>
        <p>Total Products: {totalProducts}</p>
        <p>Total Vendors: {totalVendors}</p>
        <p>Shipped Items: {shippedItems}</p>
        <p>Received Items: {receivedItems}</p>
        <p>Total Order Quantity: {totalOrderQuantity}</p>
        <p>Total Available Quantity: {totalAvailableQuantity}</p>
      </div>

      <div className="bg-slate-200 shadow overflow-hidden sm:rounded-lg mb-6 p-6">
        <h3 className="text-xl font-bold mb-4">Graphs</h3>
        <ShippedReceivedChart data={filteredData} />
        <br/>
        <VendorWiseChart data={filteredData} />
        <br/>
        <CategoryWiseChart data={filteredData} />
      </div>

      <div className="bg-slate-200 shadow overflow-hidden sm:rounded-lg mb-6 p-6">
        <h3 className="text-xl font-bold mb-4">Tables</h3>
        <CategoryWiseTable data={filteredData} />
        <br/>
        <WarehouseWiseTable data={filteredData} />
      </div>
    </div>
  );
};

export default SummaryPage;

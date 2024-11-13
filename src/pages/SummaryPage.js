import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShippedReceivedChart from '../components/charts/ShippedReceivedChart';
import VendorWiseChart from '../components/charts/VendorWiseChart';
import CategoryWiseChart from '../components/charts/CategoryWiseChart';

const SummaryPage = ({data}) => {
    const [startDate,  setStartDate] = useState(new Date('2024-01-01'))
    const [endDate, setEndDate] = useState(new Date());

    const filteredData = data.filter((item) => {
        const orderDate = new Date(item.orderDate);
        return orderDate >= startDate && orderDate <= endDate;
    });

    const totalWarehouses = new Set(filteredData.map(item => item.WarehouseName)).size;
    const totalCategories = new Set(filteredData.map(item => item.CategoryName)).size;
    const totalProducts = new Set(filteredData.map(item => item.ProductName)).size;
    const totalVendors = new Set(filteredData.map(item => item.VendorName)).size;
    const shippedItems = filteredData.filter(item => item.Status === 'Shipped').length;
    const receivedItems = filteredData.filter(item => item.Status === 'Received').length;
    const totalOrderQuantity = filteredData.reduce((sum, item) => sum + item.OrderItemQuantity, 0);
    const totalAvailableQuantity = filteredData.reduce((sum,  item) => sum + item.AvailableQuanty, 0)

    return (
        <div>
            <h2>Inventory Summary</h2>
            <div>
                <label>Start Date:</label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <label>End Date:</label>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
            <div>
                <h3>Key Data Points</h3>
                <p>Total Warehouses: {totalWarehouses}</p>
                <p>Total Categories: {totalCategories}</p>
                <p>Total Products: {totalProducts}</p>
                <p>Total Vendors: {totalVendors}</p>
                <p>Shipped Items: {shippedItems}</p>
                <p>Received Items: {receivedItems}</p>
                <p>Total Order Quantity: {totalOrderQuantity}</p>
                <p>Total Available Quantity: {totalAvailableQuantity}</p>
            </div>
            <div>
                <h3>Graphs</h3>
                <ShippedReceivedChart data={filteredData} />
                <VendorWiseChart data={filteredData} />
                <CategoryWiseChart data={filteredData} />
            </div>
            <div>
                {/* Tables */}
            </div>
        </div>
    )
}

export default SummaryPage;
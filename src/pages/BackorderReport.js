import React, { useState } from 'react';
import { useTable } from 'react-table';
import * as XLSX from 'xlsx';

const BackorderReport = ({ data }) => {
  const categories = [...new Set(data.map(item => item.CategoryName))];
  const [selectedCategory, setSelectedCategory] = useState('');

  const backorderData = data.filter(item => {
    if (selectedCategory && item.CategoryName !== selectedCategory) return false;
    return item.OrderItemQuantity > item.AvaliableQuantity;
  }).map(item => ({
    Category: item.CategoryName,
    Product: item.ProductName,
    OrderQuantity: item.OrderItemQuantity,
    AvailableQuantity: item.AvaliableQuantity,
    BackorderQuantity: item.OrderItemQuantity - item.AvaliableQuantity,
  }));

  const columns = React.useMemo(
    () => [
      { Header: 'Category', accessor: 'Category' },
      { Header: 'Product', accessor: 'Product' },
      { Header: 'Order Quantity', accessor: 'OrderQuantity' },
      { Header: 'Available Quantity', accessor: 'AvailableQuantity' },
      { Header: 'Backorder Quantity', accessor: 'BackorderQuantity' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: backorderData });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(backorderData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'backorder-report.xlsx');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Backorder Report</h2>
      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Filter by Category:</label>
        <select 
        onChange={(e) => setSelectedCategory(e.target.value)} 
        value={selectedCategory}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value=''>All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <button 
        onClick={exportToExcel}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
            Export to Excel
      </button>
      <table {...getTableProps()}
      className="min-w-full border border-gray-300"
      >
        <thead className="bg-gray-50">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th 
                    {...column.getHeaderProps()}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                >
                    {column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white">
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr 
                {...row.getRowProps()}
                className="border-t border-gray-200"
              >
                {row.cells.map(cell => (
                  <td 
                  {...cell.getCellProps()}
                  className="px-4 py-2 whitespace-nowrap text-sm text-gray-700" 
                  >
                    {cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BackorderReport;

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
      <h2>Backorder Report</h2>
      <div>
        <label>Filter by Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value=''>All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <button onClick={exportToExcel}>Export to Excel</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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

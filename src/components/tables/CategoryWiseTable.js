import React from 'react';
import { useTable } from 'react-table';
import * as XLSX from 'xlsx';

const CategoryWiseTable = ({ data }) => {
  const categories = [...new Set(data.map(item => item.CategoryName))];
  const tableData = categories.map(category => {
    const filteredData = data.filter(item => item.CategoryName === category);
    return {
      category,
      totalOrderQuantity: filteredData.reduce((sum, item) => sum + item.OrderItemQuantity, 0),
      totalAvailableQuantity: filteredData.reduce((sum, item) => sum + item.AvailableQuantity, 0),
    };
  });

  const columns = React.useMemo(
    () => [
      { Header: 'Category', accessor: 'category' },
      { Header: 'Total Order Quantity', accessor: 'totalOrderQuantity' },
      { Header: 'Total Available Quantity', accessor: 'totalAvailableQuantity' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'category-wise-table.xlsx');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <button 
        onClick={exportToExcel} 
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Export to Excel
      </button>
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50"> 
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-50" key={headerGroup.id}> {headerGroup.headers.map(column => ( <th {...column.getHeaderProps()} key={column.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> {column.render('Header')} </th> ))} </tr> ))} </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryWiseTable;

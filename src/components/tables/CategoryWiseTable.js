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
      totalAvailableQuantity: filteredData.reduce((sum, item) => sum + item.AvaliableQuantity, 0),
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
    <div>
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

export default CategoryWiseTable;

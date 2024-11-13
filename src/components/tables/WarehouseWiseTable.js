import React from 'react';
import { useTable } from 'react-table';
import * as XLSX from 'xlsx';

const WarehouseWiseTable = ({ data }) => {
  const warehouses = [...new Set(data.map(item => item.WarehouseName))];
  const tableData = warehouses.map(warehouse => {
    const filteredData = data.filter(item => item.WarehouseName === warehouse);
    return {
      warehouse,
      totalOrderQuantity: filteredData.reduce((sum, item) => sum + item.OrderItemQuantity, 0),
      totalAvailableQuantity: filteredData.reduce((sum, item) => sum + item.AvaliableQuantity, 0),
      shippedItems: filteredData.filter(item => item.Status === "Shipped").length,
      receivedItems: filteredData.filter(item => item.Status === "Received").length,
    };
  });

  const columns = React.useMemo(
    () => [
      { Header: 'Warehouse', accessor: 'warehouse' },
      { Header: 'Total Order Quantity', accessor: 'totalOrderQuantity' },
      { Header: 'Total Available Quantity', accessor: 'totalAvailableQuantity' },
      { Header: 'Shipped Items', accessor: 'shippedItems' },
      { Header: 'Received Items', accessor: 'receivedItems' },
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
    XLSX.writeFile(wb, 'warehouse-wise-table.xlsx');
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

export default WarehouseWiseTable;

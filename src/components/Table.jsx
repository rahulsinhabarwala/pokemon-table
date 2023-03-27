import React from "react";
import "./Table.css";

const Table = ({columns, data}) => {
  
  return (
    <table id="customers">
      <thead>
        <tr>
          {columns.map((field) => (
            <th>{field.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.field}>{row[column.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

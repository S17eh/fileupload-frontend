// src/components/DataTable.js
import React, { useState } from "react";

const DataTable = ({ data, onConfirm, onCancel }) => {
  const [selectedData, setSelectedData] = useState(data);

  const handleConfirm = () => {
    onConfirm(selectedData);
  };

  return (
    <div>
      <h3>Review Data</h3>
      <table border="1">
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DataTable;

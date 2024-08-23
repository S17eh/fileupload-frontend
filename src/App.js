// src/App.js
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import DataTable from "./components/DataTable";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);

  const handleDataLoaded = (data) => {
    setData(data);
  };

  const handleConfirm = async (data) => {
    try {
      await axios.post("/api/confirm", data);
      alert("Data saved successfully!");
      setData(null); // Clear data after confirmation
    } catch (err) {
      alert("Error saving data: " + err.message);
    }
  };

  const handleCancel = () => {
    setData(null); // Clear data on cancel
  };

  return (
    <div>
      <h1 style={styles.heading}>Upload Book & Auther Data</h1>
      {!data ? (
        <FileUpload onDataLoaded={handleDataLoaded} />
      ) : (
        <DataTable
          data={data.authors.concat(data.books)}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "5px",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  buttonCancel: {
    backgroundColor: "#dc3545",
  },
  buttonCancelHover: {
    backgroundColor: "#c82333",
  },
};

export default App;

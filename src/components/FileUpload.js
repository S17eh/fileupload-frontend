// src/components/FileUpload.js
import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (validTypes.includes(fileType)) {
        setFile(selectedFile);
        setError(""); // Clear previous errors
      } else {
        setFile(null);
        setError("Please upload a valid Excel file (.xls or .xlsx).");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.authors.length > 0 || response.data.books.length > 0) {
        setData(response.data);
        setShowConfirm(true);
      } else {
        setError("No valid data found in the file.");
      }
    } catch (err) {
      setError("Error uploading file: " + err.message);
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post("http://localhost:8000/api/confirm", data);
      setError("");
      setData(null);
      setShowConfirm(false);
      alert("Data saved successfully.");
    } catch (err) {
      setError("Error saving data: " + err.message);
    }
  };

  const handleCancel = () => {
    setData(null);
    setShowConfirm(false);
  };

  return (
    <div style={styles.container}>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
      <button
        style={styles.button}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.buttonHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.button.backgroundColor)
        }
        onClick={handleUpload}
      >
        Upload
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {showConfirm && (
        <div style={styles.confirm}>
          <h3>Confirm Upload</h3>
          <p>Do you want to save the following data?</p>
          <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
          <button style={styles.button} onClick={handleConfirm}>
            Confirm
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonCancel }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.buttonCancelHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.buttonCancel.backgroundColor)
            }
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    marginRight: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
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
  pre: {
    backgroundColor: "#f8f9fa",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    overflowX: "auto",
  },
  error: {
    color: "#dc3545",
  },
  confirm: {
    marginTop: "20px",
  },
};

export default FileUpload;

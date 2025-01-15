import React, { useState } from "react";
import axios from "axios";

const AddAlert = ({ fetchAlerts }) => {
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState("above");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/alerts", {
        userEmail: "prathamesh.223414101@vcet.edu.in", // Replace with dynamic user email
        cryptoSymbol,
        targetPrice,
        condition,
      });
      fetchAlerts(); // Refresh alert list
    } catch (error) {
      console.error("Error adding alert:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group">
        <label htmlFor="cryptoSymbol">Crypto Symbol (e.g., BTC)</label>
        <input
          type="text"
          className="form-control"
          id="cryptoSymbol"
          placeholder="Enter crypto symbol"
          value={cryptoSymbol}
          onChange={(e) => setCryptoSymbol(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="targetPrice">Target Price</label>
        <input
          type="number"
          className="form-control"
          id="targetPrice"
          placeholder="Enter target price"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="condition">Condition</label>
        <select
          className="form-control"
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Set Alert
      </button>
    </form>
  );
};

export default AddAlert;

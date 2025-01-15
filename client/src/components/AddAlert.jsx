import React, { useState } from "react";
import axios from "axios";

const AddAlert = ({ fetchAlerts }) => {
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState("above");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

  // Validate input fields before submission
  const validateInputs = () => {
    if (!cryptoSymbol.trim()) return "Crypto symbol is required.";
    if (!/^[A-Z]+$/.test(cryptoSymbol))
      return "Crypto symbol should only contain Capital alphabet characters.";
    if (!targetPrice || isNaN(targetPrice) || Number(targetPrice) <= 0)
      return "Target price must be a positive number.";
    if (!userEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail))
      return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Validate inputs
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/alerts", {
        userEmail,
        cryptoSymbol,
        targetPrice,
        condition,
      });
      fetchAlerts(); // Refresh alert list
      // Reset form after successful submission
      setCryptoSymbol("");
      setTargetPrice("");
      setUserEmail("");
      setCondition("above");
    } catch (error) {
      console.error("Error adding alert:", error);
      setError("Failed to add alert. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h3>Set a New Crypto Alert</h3>
      {error && <div className="alert alert-danger">{error}</div>}

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
        <label htmlFor="userEmail">User Email</label>
        <input
          type="email"
          className="form-control"
          id="userEmail"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
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

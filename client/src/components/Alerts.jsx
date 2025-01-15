import React from "react";
import axios from "axios";

const Alerts = ({ alerts, fetchAlerts }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/alerts/${id}`);
      fetchAlerts(); // Refresh alert list
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  return (
    <div className="container mt-4">
      <ul className="list-group">
        {alerts.map((alert) => (
          <li key={alert._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {alert.cryptoSymbol} {alert.condition} {alert.targetPrice}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(alert._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;

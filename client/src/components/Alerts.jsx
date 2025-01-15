import React from "react";
import axios from "axios";

const Alerts = ({ alerts, fetchAlerts }) => {
  // Handle delete operation with confirmation
  const handleDelete = async (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this alert?"
    );
    if (!confirmDeletion) return;

    try {
      await axios.delete(`http://localhost:5000/api/alerts/${id}`);
      fetchAlerts(); // Refresh alert list
    } catch (error) {
      console.error("Error deleting alert:", error);
      alert("Failed to delete the alert. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Current Alerts</h3>
      {alerts.length === 0 ? (
        <p className="text-muted">No alerts set. Add a new alert above.</p>
      ) : (
        <ul className="list-group">
          {alerts.map((alert) => (
            <li
              key={alert._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {alert.cryptoSymbol} {alert.condition} {alert.targetPrice}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(alert._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alerts;

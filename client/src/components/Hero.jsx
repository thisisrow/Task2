import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAlert from "./AddAlert";
import Alerts from "./Alerts";

const Hero = () => {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch cryptocurrency data
  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/api/crypto/markets`, {
        params: { currency },
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch cryptocurrency data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch alerts
  const fetchAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/alerts");
      setAlerts(response.data);
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setError("Failed to fetch alerts. Please try again.");
    }
  };

  // Effect for fetching cryptocurrency data when the currency changes
  useEffect(() => {
    fetchData();
  }, [currency]);

  // Effect for fetching alerts when the component mounts
  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setName(searchTerm);

    const filtered = data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center">Crypto Search</h1>

      {/* Search and Currency Selector */}
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-5">
          <input
            type="text"
            className="form-control mx-3"
            placeholder="Search by name or symbol"
            value={name}
            onChange={handleSearch}
          />
        </div>
        <div className="col-2">
          <select
            className="form-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-9">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : (
            <table className="table table-light table-hover">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Coin</th>
                  <th scope="col">Price</th>
                  <th scope="col">24H Change</th>
                  <th scope="col">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.slice(0, 10).map((coin) => (
                    <tr key={coin.id}>
                      <th scope="row">{coin.market_cap_rank}</th>
                      <td>
                        <figure className="d-flex align-items-center">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            style={{ width: "25px", height: "25px", marginRight: "10px" }}
                          />
                          <figcaption>
                            {coin.name} ({coin.symbol.toUpperCase()})
                          </figcaption>
                        </figure>
                      </td>
                      <td>
                        {coin.current_price.toLocaleString()} {currency.toUpperCase()}
                      </td>
                      <td
                        style={{
                          color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                        }}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td>{coin.market_cap.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available. Try another search term.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Alerts Section */}
      <div>
        <h1>Crypto Alert System</h1>
        <AddAlert fetchAlerts={fetchAlerts} />
        <Alerts alerts={alerts} fetchAlerts={fetchAlerts} />
      </div>
    </div>
  );
};

export default Hero;

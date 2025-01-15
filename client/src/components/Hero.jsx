import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAlert from "./AddAlert";
import Alerts from "./Alerts";
const Hero = () => {
    const [name, setName] = useState("");
    const [currency, setCurrency] = useState("usd");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [alerts, setAlerts] = useState([]); // To store alerts
  
    // Fetch data from the backend API
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/crypto/markets`, {
            params: { currency },
          });
          setData(response.data);
          setFilteredData(response.data); // Initialize filtered data
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [currency]);
  
    // Fetch alerts from the backend
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/alerts");
        setAlerts(response.data); // Set the fetched alerts
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
  
    // Fetch alerts when the component mounts
    useEffect(() => {
      fetchAlerts();
    }, []);
  
    const handleSearch = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      setName(searchTerm);
  
      const filtered = data.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
      );
  
      setFilteredData(filtered);
    };
  
    return (
      <>
        <div className="container-fluid">
          <h1 className="text-center">Crypto Search</h1>
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-5">
              <form className="d-flex">
                <input
                  type="text"
                  className="form-control mx-3"
                  placeholder="Search by name or symbol"
                  value={name}
                  onChange={handleSearch}
                />
              </form>
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
  
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-9">
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
                        <td>{coin.current_price.toLocaleString()} {currency.toUpperCase()}</td>
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
                        No data available. Search for a cryptocurrency.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
  
          <div>
            <h1>Crypto Alert System</h1>
            <AddAlert fetchAlerts={fetchAlerts} />
            <Alerts alerts={alerts} fetchAlerts={fetchAlerts} />
          </div>
        </div>
      </>
    );
  };
  
  export default Hero;

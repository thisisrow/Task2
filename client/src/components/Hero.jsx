import React, { useState, useEffect } from "react";

const Hero = () => {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from the API based on the selected currency
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-u9mxa7K1n45Usrs4mTjdrQkA",
        },
      };

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`,
          options
        );
        const result = await response.json();
        setData(result);
        setFilteredData(result); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currency]);

  // Handle search input change to filter data locally
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
                  <th scope="col">#</th>
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
      </div>
    </>
  );
};

export default Hero;

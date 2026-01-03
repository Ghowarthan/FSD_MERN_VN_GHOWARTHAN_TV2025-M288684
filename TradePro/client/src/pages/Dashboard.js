import React from 'react';
import axios from 'axios';

const Dashboard = () => {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple', price: 150 },
    { symbol: 'TSLA', name: 'Tesla', price: 700 },
    { symbol: 'GOOGL', name: 'Google', price: 2800 },
    { symbol: 'AMZN', name: 'Amazon', price: 3400 },
  ];

  const buyStock = async (stock) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login to trade');

    const qty = prompt(`Enter quantity for ${stock.symbol}:`);
    if (!qty) return;

    try {
      await axios.post('http://localhost:5000/api/trade/buy', 
        { symbol: stock.symbol, price: stock.price, quantity: Number(qty) },
        { headers: { 'x-auth-token': token } }
      );
      alert('Buy Successful!');
    } catch (err) {
      alert('Insufficient Funds or Error');
    }
  };

  return (
    <div>
      <h2>Live Market</h2>
      <div className="row">
        {stocks.map(stock => (
          <div className="col-md-3 mb-4" key={stock.symbol}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{stock.symbol}</h5>
                <p className="card-text">{stock.name}</p>
                <h3>${stock.price}</h3>
                <button onClick={() => buyStock(stock)} className="btn btn-success w-100">Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
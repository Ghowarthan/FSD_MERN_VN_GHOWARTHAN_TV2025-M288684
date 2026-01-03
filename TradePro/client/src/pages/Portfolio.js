import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/auth', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  if (!user) return <p>Loading... (Make sure you are logged in)</p>;

  return (
    <div>
      <div className="alert alert-info">
        <h3>Wallet Balance: ${user.wallet.toFixed(2)}</h3>
      </div>
      <h3>My Holdings</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Avg Price</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {user.portfolio.map((item, index) => (
            <tr key={index}>
              <td>{item.symbol}</td>
              <td>{item.quantity}</td>
              <td>${item.avgPrice.toFixed(2)}</td>
              <td>${(item.quantity * item.avgPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
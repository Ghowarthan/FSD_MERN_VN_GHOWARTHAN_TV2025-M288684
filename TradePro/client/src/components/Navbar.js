import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">TradePro</Link>
        <div className="ml-auto">
          {token ? (
            <>
              <Link className="btn btn-outline-light me-2" to="/portfolio">Portfolio</Link>
              <button onClick={logout} className="btn btn-danger">Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-primary me-2" to="/login">Login</Link>
              <Link className="btn btn-success" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
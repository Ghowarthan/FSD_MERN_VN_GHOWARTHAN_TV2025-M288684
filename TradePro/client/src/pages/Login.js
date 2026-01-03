import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      // Force reload to update Navbar state
      window.location.href = '/'; 
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className='col-md-6 offset-md-3'>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={onChange} required />
        <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={onChange} required />
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
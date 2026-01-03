import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (err) {
      alert('Error Registering');
    }
  };

  return (
    <div className='col-md-6 offset-md-3'>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input className="form-control mb-3" type="text" name="name" placeholder="Name" onChange={onChange} required />
        <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={onChange} required />
        <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={onChange} required />
        <button className="btn btn-success w-100" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
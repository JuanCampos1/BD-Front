import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  const userNavigate = useNavigate();
  const [ci, setCi] = useState('');
  const [password, setPassword] = useState('');

 const handleSubmit = event => {
  event.preventDefault();

  // Create an object representing the request body
  const requestBody = {
    ci: ci,
    contraseña: password,
  };

  // Make a POST request to the backend
  fetch('http://localhost:8080/api/alumnos/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
        console.log('Success:', data);
        if (data.token) {
            localStorage.setItem('token', data.token);
            userNavigate('/main');
        }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  return (
    <div className='auth-container'>
      <h1>Universidad Catolica del Uruguay</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          CI:
          <input type="text" value={ci} onChange={e => setCi(e.target.value)} style={inputStyle} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        </label>
        <input type="submit" value="Log in" style={inputStyle} />
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  const userNavigate = useNavigate();
  const [ci, setCi] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      userNavigate('/fixture');
    }
  }, [userNavigate]);

  const handleSubmit = async event => {
    event.preventDefault();
  
    const requestBody = {
      ci: ci,
      contraseña: password,
    };
  
    try {
      const userResponse = await loginUser(requestBody);
      if (userResponse?.token) {
        localStorage.setItem('token', userResponse.token);
        userNavigate('/main');
        return;
      } else {
        const adminResponse = await loginAdmin(requestBody);
        if (adminResponse?.token) {
          localStorage.setItem('token', adminResponse.token);
          userNavigate('/admin/main');
          return;
        }
        alert('Invalid credentials');
      }
    } catch (e) {
      console.error(e);
    }
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

function loginUser(requestBody) {
  return fetch('http://localhost:8081/api/alumnos/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }).then(response => {
      if (response.status !== 200) {
        throw new Error('Invalid credentials');
      }
      return response.json();
    }).then(data => {
        console.log('Success:', data);
        return data;
    }).catch((error) => {
      console.error('Error:', error);
    });
}

function loginAdmin(requestBody) {
  return fetch('http://localhost:8081/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }).then(response => {
      if (response.status !== 200) {
        throw new Error('Invalid credentials');
      }
      return response.json();
    }).then(data => {
        console.log('Success:', data);
        return data;
    }).catch((error) => {
      console.error('Error:', error);
    });
}

export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Auth.css';

function Register() {
  const userNavigate = useNavigate();
  const [ci, setCi] = useState('');
  const [password, setPassword] = useState('');
  const [equipos, setEquipos] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [nombre, setNombre] = useState('');
  const [eqCampeon, setEqCampeon] = useState('');
  const [eqSubCampeon, setEqSubCampeon] = useState('');
  const [carrera, setCarrera] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/equipo')
      .then(response => response.json())
      .then(data => setEquipos(data));

    fetch('http://localhost:8080/api/carrera')
      .then(response => response.json())
      .then(data => setCarreras(data));
  }, []);

  const validateCI = (ci) => {
    // Remove the dash
    const cleanedCI = ci.replace('-', '');
    if (cleanedCI.length !== 8) return false;

    const base = [2, 9, 8, 7, 6, 3, 4];
    let sum = 0;

    for (let i = 0; i < base.length; i++) {
      sum += parseInt(cleanedCI[i]) * base[i];
    }

    const M = sum % 10;
    const verifier = (10 - M) % 10;
    return verifier === parseInt(cleanedCI[7]);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!validateCI(ci)) {
      alert('La cédula no es válida');
      return;
    }

    const requestBody = {
      ci: ci,
      nombre: nombre,
      eqcampeon: eqCampeon,
      eqsubcampeon: eqSubCampeon,
      contraseña: password,
      carrera: carrera,
    };

    console.log(requestBody);

    fetch('http://localhost:8080/api/alumnos/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
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
      <h1>Universidad Católica del Uruguay</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          CI:
          <input type="text" value={ci} onChange={e => setCi(e.target.value)} style={inputStyle} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        </label>
        <label>
          Ingresa tu Nombre:
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} style={inputStyle} />
        </label>
        <label>
          Selecciona tu Equipo Campeón:
          <select name="eqCampeon" value={eqCampeon} onChange={e => setEqCampeon(e.target.value)} style={inputStyle}>
            <option value="">Seleccionar</option>
            {equipos.map((equipo, index) => (
              <option key={index} value={equipo.nombre}>
                {equipo.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Selecciona tu Equipo Subcampeón:
          <select name="eqsubcampeon" value={eqSubCampeon} onChange={e => setEqSubCampeon(e.target.value)} style={inputStyle}>
            <option value="">Seleccionar</option>
            {equipos
              .filter(equipo => equipo.nombre !== eqCampeon)
              .map((equipo, index) => (
                <option key={index} value={equipo.nombre}>
                  {equipo.nombre}
                </option>
              ))}
          </select>
        </label>
        <label>
          Selecciona tu Carrera:
          <select name="carrera" value={carrera} onChange={e => setCarrera(e.target.value)} style={inputStyle}>
            <option value="">Seleccionar</option>
            {carreras.map((carrera, index) => (
              <option key={index} value={carrera.id}>
                {carrera.nombre}
              </option>
            ))}
          </select>
        </label>
        <input
          type="submit"
          value="Register"
          style={inputStyle}
          disabled={!eqCampeon || !eqSubCampeon || !ci || carrera === '' || password.length < 7}
        />
        <p>Already have an account? <Link to="/">Log In</Link></p>
      </form>
    </div>
  );
}

export default Register;

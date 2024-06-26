import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ranking.css';

function Ranking() {
  const [rankings, setRankings] = useState([]);
  const [carreras, setCarreras] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/api/alumnos/leaderboard')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        return response.json();
      })
      .then(data => {
        setRankings(data);
      })
      .catch(error => console.error('Error:', error));

    fetch('http://localhost:8081/api/carrera')
      .then(response => response.json())
      .then(data => {
        const carrerasMap = data.reduce((map, carrera) => ({ ...map, [carrera.id]: carrera.nombre }), {});
        setCarreras(carrerasMap);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="ranking-container">
      <h1>Ranking de Alumnos</h1>
      <table className='ranking-table'>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {rankings.length === 0 ? (
            <tr>
              <td colSpan="4">Cargando datos...</td>
            </tr>
          ) : (
            rankings.map((alumno, index) => (
              <tr key={alumno.CI}>
                <td>{index + 1}</td>
                <td>{alumno.Nombre}</td>
                <td>{carreras[alumno.Carrera] || 'Carrera no encontrada'}</td>
                <td>{alumno.Puntos}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="buttons">
        <button type="button" onClick={() => navigate("/admin/main")}>Volver</button>
      </div>
    </div>
  );
}

export default Ranking;

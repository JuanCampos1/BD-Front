import React, { useState, useEffect } from 'react';
import './FinalUpdate.css';

const FinalUpdate = () => {
  const [equipos, setEquipos] = useState([]);
  const [eqCampeon, setEqCampeon] = useState('');
  const [eqSubCampeon, setEqSubCampeon] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/equipo')
      .then(response => response.json())
      .then(data => setEquipos(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/prediccion/update/final', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eqCampeon, eqSubCampeon }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Resultados finales actualizados');
      } else {
        alert(data.message || 'Error al actualizar los resultados');
      }
    } catch (error) {
      console.error('Error al actualizar los resultados:', error);
      alert('Error al actualizar los resultados');
    }
  };

  return (
    <div className="final-update-container">
      <h2>Actualizar Resultados Finales</h2>
      <form onSubmit={handleSubmit} className="final-update-form">
        <div className="form-group">
          <label htmlFor="eqCampeon">Equipo Campeón:</label>
          <select
            id="eqCampeon"
            value={eqCampeon}
            onChange={e => setEqCampeon(e.target.value)}
          >
            <option value="">Seleccionar</option>
            {equipos
              .filter(equipo => equipo.nombre !== eqSubCampeon)
              .map(equipo => (
                <option key={equipo.nombre} value={equipo.nombre}>
                  {equipo.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="eqSubCampeon">Equipo Subcampeón:</label>
          <select
            id="eqSubCampeon"
            value={eqSubCampeon}
            onChange={e => setEqSubCampeon(e.target.value)}
          >
            <option value="">Seleccionar</option>
            {equipos
              .filter(equipo => equipo.nombre !== eqCampeon)
              .map(equipo => (
                <option key={equipo.nombre} value={equipo.nombre}>
                  {equipo.nombre}
                </option>
              ))}
          </select>
        </div>
        <button type="submit" disabled={!eqCampeon || !eqSubCampeon}>
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default FinalUpdate;

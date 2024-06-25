import React, { useEffect, useState } from 'react';
import './Main-page.css';

function MainPage() {
  const [partidos, setPartidos] = useState([]);
  const [estadios, setEstadios] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/api/partido')
      .then(response => response.json())
      .then(data => setPartidos(data))
      .catch(error => console.error('Error:', error));

    fetch('http://localhost:8080/api/estadio')
      .then(response => response.json())
      .then(data => {
        const estadioMap = data.reduce((map, estadio) => ({ ...map, [estadio.id]: estadio }), {});
        setEstadios(estadioMap);
      })
      .catch(error => console.error('Error:', error));
  }, []);

return (
    <table className='table'>
      <thead>
        <tr>
          <th>Equipo Local</th>
          <th>Equipo Visitante</th>
          <th>Fecha y Hora</th>
          <th>Goles Locales</th>
          <th>Goles Visitante</th>
          <th>Estadio</th>
        </tr>
      </thead>
      <tbody>
        {partidos.map((item, index) => (
          <tr key={index}>
            <td>{item.eqloc}</td>
            <td>{item.eqvis}</td>
            <td>{item.fechahora}</td>
            <td>{item.golesloc}</td>
            <td>{item.golesvis}</td>
            <td>{estadios[item.estadio]?.nombre || 'Loading...'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MainPage;
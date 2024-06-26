import React, { useEffect, useState } from 'react';
import './Fixture.css';

function Fixture() {
  const [partidos, setPartidos] = useState([]);
  const [estadios, setEstadios] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/api/partido')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        return response.json();
      })
      .then(data => setPartidos(data))
      .catch(error => console.error('Error al cargar los partidos:', error));

    fetch('http://localhost:8080/api/estadio')
    .then(response => response.json())
     .then(data => {
       const estadioMap = data.reduce((map, estadio) => ({ ...map, [estadio.id]: estadio }), {});
       setEstadios(estadioMap);
     })
     .catch(error => console.error('Error:', error));
  }, []);




  return (
    <div id="fixture">
      <header>
        <h1>Fixture de la Copa América 2024</h1>
      </header>
      <main>
        <section id="fixture">
          <table>
            <thead>
              <tr>
                <th>Equipo Local</th>
                <th>Resultado</th>
                <th>Equipo Visitante</th>
                <th>Fecha y Hora</th>
                <th>Estadio</th>
              </tr>
            </thead>
            <tbody id="fixture-body">
              {partidos.map((partido, index) => (
                <tr key={index}>
                  <td>{partido.eqloc}</td>
                  <td>{partido.golesloc} - {partido.golesvis}</td>
                  <td>{partido.eqvis}</td>
                  <td>{new Date(partido.fechahora).toLocaleString()}</td>
                  <td>{estadios[partido.estadio] ? estadios[partido.estadio].nombre : 'Nombre no encontrado'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="buttons">
          <button type="button" onClick={() => window.location.href = 'main'}>Volver</button>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Universidad Católica del Uruguay. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Fixture;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminPartido.css';
import {toLocalISOString} from '../../utils/utlis';

function AdminPartido() {
    const navigate = useNavigate();
    const [partidos, setPartidos] = useState([]);
    const [estadios, setEstadios] = useState({});
    const [golesLoc, setGolesLoc] = useState([]);
    const [golesVis, setGolesVis] = useState([]);

    function handleAddPartido() {
        navigate('/admin/partido/add');
      }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        fetch('http://localhost:8081/api/partido')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => setPartidos(data))
            .catch(error => console.error('Error al cargar los partidos:', error));

        fetch('http://localhost:8081/api/estadio')
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
                <h1>Actualizar Resultados de Partidos</h1>
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
                                <th>Ingresar Resultado</th> {/* New column header */}
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
                                    <td>
                                        {
                                            partido.golesloc === null && partido.golesvis === null &&
                                            <>
                                                <div>
                                                    <input
                                                        type="number"
                                                        value={golesLoc[index] || ''}
                                                        onChange={e => {
                                                            const newGolesLoc = [...golesLoc];
                                                            newGolesLoc[index] = e.target.value;
                                                            setGolesLoc(newGolesLoc);
                                                        }}
                                                        style={{ width: '50px' }}
                                                    />
                                                    <span> - </span>
                                                    <input
                                                        type="number"
                                                        value={golesVis[index] || ''}
                                                        onChange={e => {
                                                            const newGolesVis = [...golesVis];
                                                            newGolesVis[index] = e.target.value;
                                                            setGolesVis(newGolesVis);
                                                        }}
                                                        style={{ width: '50px' }}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="addPartidoButton"
                                                    disabled={golesLoc[index] === '' || golesVis[index] === '' || isNaN(Number(golesLoc[index])) || isNaN(Number(golesVis[index]))}
                                                    onClick={() => {
                                                        updatePartido(partido.eqloc, partido.eqvis, golesLoc[index], golesVis[index], partido.fechahora);
                                                    }}
                                                    style={{ backgroundColor: (golesLoc[index] === '' || golesVis[index] === '' || isNaN(Number(golesLoc[index])) || isNaN(Number(golesVis[index]))) ? 'grey' : '' }}
                                                >
                                                    Actualizar resultado
                                                </button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="button" className="addPartidoButton" onClick={handleAddPartido}>Agregar Partido</button>   
                    </div>             
                </section>
                <div className="buttons">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="button" className="addPartidoButton" onClick={() => navigate('/admin/main')}>Volver</button>
                    </div>
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Universidad Católica del Uruguay. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

function updatePartido(eqLoc, eqVis, golesLoc, golesVis, fechaHora) {
    fetch('http://localhost:8081/api/partido/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            eqLoc,
            eqVis,
            golesLoc,
            golesVis,
            fechaHora: toLocalISOString(new Date(fechaHora)),
        }),
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.message) alert(data.message);
        console.log('Success:', data);
        window.location.reload();
    }).catch((error) => {
        alert('Ha habido un error al actualizar el partido');
        console.error('Error:', error);
    });
}

export default AdminPartido;

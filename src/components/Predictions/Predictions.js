import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Predictions.css';

function Prediction() {
    const navigate = useNavigate();
    const [partidos, setPartidos] = useState([]);
    const [estadios, setEstadios] = useState({});
    const [golesLoc, setGolesLoc] = useState([]);
    const [golesVis, setGolesVis] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

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
                <h1>Escoge el partido en el que deseas hacer una prediccion</h1>
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
                                <th>Prediccion</th> {/* New column header */}
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
                                            new Date(partido.fechahora) - new Date() >= 60 * 60 * 1000 &&
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
                                                    disabled={golesLoc[index] === '' || golesVis[index] === '' || isNaN(Number(golesLoc[index])) || isNaN(Number(golesVis[index]))}
                                                    onClick={() => {
                                                        makePrediction(partido.eqloc, partido.eqvis, golesLoc[index], golesVis[index], partido.fechahora);
                                                    }}
                                                    style={{ backgroundColor: (golesLoc[index] === '' || golesVis[index] === '' || isNaN(Number(golesLoc[index])) || isNaN(Number(golesVis[index]))) ? 'grey' : 'green' }}
                                                >
                                                    Hacer prediccion
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={golesLoc[index] === '' || golesVis[index] === '' || isNaN(Number(golesLoc[index])) || isNaN(Number(golesVis[index]))}
                                                    onClick={() => {
                                                        updatePrediction(partido.eqloc, partido.eqvis, golesLoc[index], golesVis[index], partido.fechahora);
                                                    }}
                                                    style={{ backgroundColor: (golesLoc[index] === '' || golesVis[index] === '' || isNaN(Number(golesLoc[index])) || isNaN(Number(golesVis[index]))) ? 'grey' : 'seagreen' }}
                                                >
                                                    Modificar prediccion
                                                </button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <div className="buttons">
                    <button type="button" onClick={() => navigate("/main")}>Volver</button>
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Universidad Católica del Uruguay. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

function toLocalISOString(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}

function makePrediction(eqLoc, eqVis, golesLoc, golesVis, fechaHora) {
    fetch('http://localhost:8080/api/prediccion/add', {
        method: 'POST',
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
    })
        .catch((error) => {
            alert('Ha habido un error al hacer la prediccion');
            console.error('Error:', error);
        });
}

function updatePrediction(eqLoc, eqVis, golesLoc, golesVis, fechaHora) {
    fetch('http://localhost:8080/api/prediccion/update', {
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
    })
        .catch((error) => {
            alert('Ha habido un error al hacer la prediccion');
            console.error('Error:', error);
        });
}

export default Prediction;

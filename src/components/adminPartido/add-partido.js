import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminPartido.css';
import {toLocalISOString} from '../../utils/utlis';

function AdminAddPartido() {
    const navigate = useNavigate();
    const [equipos, setEquipos] = useState([]);
    const [estadios, setEstadios] = useState({});
    const [estadio, setEstadio] = useState('');
    const [eqLoc, setEqLoc] = useState('');
    const [eqVis, setEqVis] = useState('');
    const [fechaHora, setFechaHora] = useState('');

    function handleMakePartido(event) {
        event.preventDefault();
        fetch('http://localhost:8081/api/partido/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                eqLoc,
                eqVis,
                golesLoc: null,
                golesVis: null,
                fechaHora: toLocalISOString(new Date(fechaHora)),
                estadioId: estadio,
            }),
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.message) alert(data.message);
            console.log('Success:', data);
        })
            .catch((error) => {
                alert('Ha habido un error al hacer el partido');
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        fetch('http://localhost:8081/api/equipo')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => setEquipos(data))
            .catch(error => console.error('Error al cargar los equipos:', error));

        fetch('http://localhost:8081/api/estadio')
            .then(response => response.json())
            .then(data => {
                const estadioMap = data.reduce((map, estadio) => ({ ...map, [estadio.id]: estadio }), {});
                setEstadios(estadioMap);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div id="fixture" className='add-partido-container'>
            <header>
                <h1>AGREGAR PARTIDO</h1>
            </header>
            <main>
                <section id="fixture">
                    <form onSubmit={handleMakePartido} className='add-partido-form'>
                        <label>
                            <label>
                                Equipo Local:
                                <select name="eqLoc" value={eqLoc} onChange={e => setEqLoc(e.target.value)}>
                                    <option value="">Seleccionar</option>
                                    {equipos
                                        .filter(equipo => equipo.nombre !== eqVis)
                                        .map(equipo => (
                                            <option key={equipo.nombre} value={equipo.nombre}>
                                                {equipo.nombre}
                                            </option>
                                        ))}
                                </select>
                            </label>
                            <label>
                                Equipo Visitante:
                                <select name="eqVis" value={eqVis} onChange={e => setEqVis(e.target.value)}>
                                    <option value="">Seleccionar</option>
                                    {equipos.filter(equipo => equipo.nombre !== eqLoc).map((equipo, index) => (
                                        <option key={equipo.nombre} value={equipo.id}>
                                            {equipo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </label>
                        <label>
                            Fecha y Hora:
                            <input type="datetime-local" value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} />
                        </label>
                        <label>
                            Estadio:
                            <select value={estadio} onChange={(e) => setEstadio(e.target.value)}>
                                <option value="">Seleccionar</option>
                                {Object.values(estadios).map((est, index) => (
                                    <option key={index} value={est.id}>
                                        {est.nombre}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button
                            type="submit"
                            className='addPartidoButton'
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                backgroundColor: (!eqLoc || !eqVis || !estadio) ? 'grey' : ''
                            }}
                            disabled={!eqLoc || !eqVis || !estadio}
                        >
                            Agregar Partido
                        </button>
                    </form>
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

export default AdminAddPartido;

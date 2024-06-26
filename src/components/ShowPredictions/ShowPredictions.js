import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowPredictions.css';

function ShowPredictions() {
    const [predicciones, setPredicciones] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            console.error('No se encontró el token en el local storage');
            return;
        }

        fetch('http://localhost:8080/api/prediccion', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => setPredicciones(data))
            .catch(error => console.error('Error:', error));
    }, [token]);

    return (
        <div className="predicciones-container">
            <h1 className="titulo">Mis Predicciones</h1>
            {predicciones.length === 0 ? (
                <p>No se encontraron predicciones.</p>
            ) : (
                <table className="predicciones-table">
                    <thead>
                        <tr>
                            <th>Equipo Local</th>
                            <th>Resultado</th>
                            <th>Equipo Visitante</th>
                            <th>Fecha y Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predicciones.map(prediccion => (
                            <tr key={prediccion.id}>
                                <td>{prediccion.eqloc}</td>
                                <td>{prediccion.golesloc} - {prediccion.golesvis}</td>
                                <td>{prediccion.eqvis}</td>
                                <td>{new Date(prediccion.fechahora).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button type="button" onClick={() => navigate("/main")}>Volver</button>
        </div>
    );
}

export default ShowPredictions;

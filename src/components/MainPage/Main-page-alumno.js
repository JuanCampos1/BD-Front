import { useNavigate } from 'react-router-dom';
import './admin-styles.css'

function MainPageAlumno() {
    const navigate = useNavigate();

    return (
        <div>
            <header>
                <h1>Panel de Alumno - Copa América 2024</h1>
            </header>
            <main>
                <section id="admin-panel">
                    <button type="button" onClick={() => navigate('/fixture')}>Ver Fixture</button>
                    <button type="button" onClick={() => navigate('/prediction')}>Ingresar y Modificar Predicciones</button>
                    <button type="button" onClick={() => navigate('/showpredictions')}>Ver Predicciones</button>
                    <button type="button" onClick={() => navigate('/ranking')}>Ver el Ranking</button>
                    <button type="button" style={{ backgroundColor: 'red' }} onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/');
                    }}>Log Out
                    </button>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Universidad Católica del Uruguay. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default MainPageAlumno;
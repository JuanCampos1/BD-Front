document.addEventListener('DOMContentLoaded', function() {
    // Manejar el evento del botón Ingresar
    document.getElementById('ingresar-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
       
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Lógica para manejar el inicio de sesión
        fetch('https://localhost:3000/api/alumnos/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Inicio de sesión exitoso', data);
            alert('Inicio de sesión exitoso');
            // Redirige a la página de bienvenida o dashboard
            window.location.href = 'bienvenida.html';
        })
        .catch(error => {
            console.error('Error en el inicio de sesión:', error);
            alert('Error en el inicio de sesión: ' + error.message);
        });
    });

    // Manejar el evento del botón Registrarse
    document.getElementById('registrarse-btn').addEventListener('click', function() {
        window.location.href = 'registro.html'; // Redirige a la página de registro
    });
});

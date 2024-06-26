document.addEventListener('DOMContentLoaded', function () {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const ci = document.getElementById('ci').value;
        const nombre = document.getElementById('nombre').value;
        const eqcampeon = document.getElementById('eqcampeon').value;
        const eqsubcampeon = document.getElementById('eqsubcampeon').value;
        const carrera = document.getElementById('carrera').value;
        const contraseña = document.getElementById('contraseña').value;

        const response = await fetch('/api/alumnos/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ci, nombre, eqcampeon, eqsubcampeon, carrera, contraseña }),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Alumno registrado con éxito: ' + JSON.stringify(result));
        } else {
            const error = await response.json();
            alert('Error al registrar el alumno: ' + error.message);
        }
    });
});

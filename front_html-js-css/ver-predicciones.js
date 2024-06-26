document.addEventListener('DOMContentLoaded', function () {
    const prediccionesBody = document.getElementById('predicciones-body');

    fetch('http://localhost:3000/api/alumnos')
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos:', data);  // Añadir un log para verificar los datos
            data.forEach(prediccion => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${alumnos.ci}</td>
                    <td>${alumnos.nombre}</td>
                    <td>${alumnos.eqcampeon}</td>
                    <td>${alumnos.eqsubcampeon}</td>
                    <td>${alumnos.carrera}</td>
                    <td>${alumnos.puntos}</td>
                `;
                prediccionesBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar las predicciones:', error);
        });
});

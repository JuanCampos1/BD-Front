document.addEventListener('DOMContentLoaded', function () {
    const fixtureBody = document.getElementById('fixture-body');

    fetch('http://localhost:3000/api/partido')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(partido => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${partido.eqloc}</td>
                    <td>${partido.eqvis}</td>
                    <td>${new Date(partido.fechahora).toLocaleString()}</td>
                    <td>${partido.estadio}</td>
                `;
                fixtureBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar los partidos:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const rankingBody = document.getElementById('ranking-body');

    fetch('http://localhost:3000/api/ranking')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.ci}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.carrera}</td>
                    <td>${usuario.puntos}</td>
                `;
                rankingBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar el ranking:', error);
        });
});

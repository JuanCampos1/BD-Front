document.addEventListener('DOMContentLoaded', function () {
    const fechaInput = document.getElementById('fecha');
    const equipo1Select = document.getElementById('equipo1');
    const equipo2Select = document.getElementById('equipo2');
    const golesEquipo1Select = document.getElementById('goles-equipo1');
    const golesEquipo2Select = document.getElementById('goles-equipo2');
    const ingresarBtn = document.getElementById('ingresar-btn');

    const labelEquipo1 = document.getElementById('label-equipo1');
    const labelEquipo2 = document.getElementById('label-equipo2');
    const labelGolesEquipo1 = document.getElementById('label-goles-equipo1');
    const labelGolesEquipo2 = document.getElementById('label-goles-equipo2');

    const fechasHabilitadas = {
        '2024-06-20': ['Argentina', 'Canadá'],
        '2024-06-21': ['Perú', 'Chile'],
        '2024-06-22': ['Ecuador', 'Venezuela', 'México', 'Jamaica'],
        '2024-06-23': ['Estados Unidos', 'Bolivia', 'Uruguay', 'Panamá'],
        '2024-06-24': ['Colombia', 'Paraguay', 'Brasil', 'Costa Rica'],
        '2024-06-25': ['Perú', 'Canadá', 'Chile', 'Argentina'],
        '2024-06-26': ['Ecuador', 'Jamaica', 'Venezuela', 'México'],
        '2024-06-27': ['Panamá', 'Estados Unidos', 'Uruguay', 'Bolivia'],
        '2024-06-28': ['Colombia', 'Costa Rica', 'Paraguay', 'Brasil'],
        '2024-06-29': ['Argentina', 'Perú', 'Canadá', 'Chile'],
        '2024-06-30': ['Jamaica', 'Venezuela', 'México', 'Ecuador'],
        '2024-07-01': ['Estados Unidos', 'Uruguay', 'Bolivia', 'Panamá'],
        '2024-07-02': ['Brasil', 'Colombia', 'Costa Rica', 'Paraguay'],
        '2024-07-04': ['Ganador A', 'Segundo B'],
        '2024-07-05': ['Ganador B', 'Segundo A'],
        '2024-07-06': ['Ganador D', 'Segundo C', 'Ganador C', 'Segundo D'],
        '2024-07-09': ['Semifinal 1', ''],
        '2024-07-10': ['Semifinal 2', ''],
        '2024-07-13': ['Perdedor Semifinal 1', 'Perdedor Semifinal 2'],
        '2024-07-14': ['Ganador Semifinal 1', 'Ganador Semifinal 2']
    };

    fechaInput.addEventListener('input', function () {
        const selectedDate = fechaInput.value;
        if (fechasHabilitadas[selectedDate]) {
            labelEquipo1.style.display = 'block';
            equipo1Select.style.display = 'block';
            equipo1Select.innerHTML = `<option value="">Seleccione equipo 1</option>`;
            fechasHabilitadas[selectedDate].forEach(equipo => {
                equipo1Select.innerHTML += `<option value="${equipo}">${equipo}</option>`;
            });

            labelEquipo2.style.display = 'block';
            equipo2Select.style.display = 'block';
            equipo2Select.innerHTML = `<option value="">Seleccione equipo 2</option>`;
            fechasHabilitadas[selectedDate].forEach(equipo => {
                equipo2Select.innerHTML += `<option value="${equipo}">${equipo}</option>`;
            });

            labelGolesEquipo1.style.display = 'block';
            golesEquipo1Select.style.display = 'block';

            labelGolesEquipo2.style.display = 'block';
            golesEquipo2Select.style.display = 'block';

            ingresarBtn.style.display = 'block';
        } else {
            alert('Fecha no habilitada. Por favor seleccione una fecha válida.');
            fechaInput.value = '';
            equipo1Select.style.display = 'none';
            equipo2Select.style.display = 'none';
            golesEquipo1Select.style.display = 'none';
            golesEquipo2Select.style.display = 'none';
            ingresarBtn.style.display = 'none';
        }
    });

    const prediccionForm = document.getElementById('prediccionForm');
    prediccionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const fecha = fechaInput.value;
        const equipo1 = equipo1Select.value;
        const equipo2 = equipo2Select.value;
        const golesEquipo1 = golesEquipo1Select.value;
        const golesEquipo2 = golesEquipo2Select.value;

        alert(`Predicción ingresada:
Fecha: ${fecha}
Equipo 1: ${equipo1}
Goles Equipo 1: ${golesEquipo1}
Equipo 2: ${equipo2}
Goles Equipo 2: ${golesEquipo2}`);
    });
});

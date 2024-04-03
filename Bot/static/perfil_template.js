document.addEventListener("DOMContentLoaded", function () {
    // Obtiene la matrícula del usuario de la URL
    const matricula = window.location.pathname.split('/').pop();

    // Cambia el título de la página
    document.title = `Perfil - ${matricula}`;

    // Realiza una nueva solicitud para obtener los detalles del jugador
    fetch(`/api/consulta/${matricula}`)
        .then(response => response.json())
        .then(data => {
            // Obtener el nombre del primer objeto en el JSON
            const nombre = data[0].Nombre;

            // Obtener la carrera del primer objeto en el JSON
            const carrera = data[0].Carrera;

            // Cambiar el texto del <h1> al nombre obtenido
            document.querySelector("h2").textContent = nombre;
            const nombreUsuario = document.querySelector("h2");

            nombreUsuario.style.display = 'flex';

            document.querySelector("h3").textContent = carrera;
            const carreraUsuario = document.querySelector("h3");

            carreraUsuario.style.display = 'flex';

            // Crea una tabla HTML
            let table = document.createElement("table");

            

            // Crea la fila de encabezados de la tabla
            let headerRow = table.insertRow();
            for (let key in data[0]) {
                // Omitir la columna correspondiente al nombre
                if (key !== "Carrera" && key !== "Nombre" && key !== "ID" && key !== "Matricula") {
                    let headerCell = document.createElement("th");
                    headerCell.textContent = key;
                    headerCell.style.fontSize = '22px';
                    headerCell.style.padding = '10px';
                    headerCell.style.borderRadius = '10px';
                    headerCell.style.background = '#363968';
                    headerCell.style.color = 'white';
                    headerRow.appendChild(headerCell);
                }
            }

            // Agrega los datos a la tabla
            data.forEach(item => {
                let row = table.insertRow();
                for (let key in item) {
                    // Omitir la columna correspondiente al nombre
                    if (key !== "Carrera" && key !== "Nombre" && key !== "ID" && key !== "Matricula") {
                        let cell = row.insertCell();
                        cell.textContent = item[key];
                        cell.style.fontSize = '25px';
                        cell.style.padding = '10px';
                        cell.style.background = '#D7D9F1';
                        cell.style.color = '#363968';
                        cell.style.borderRadius = '10px';
                        cell.style.textAlign = 'center'
                    }
                }
            });

            // Agrega la tabla al elemento con el id "tabla-resultados"
            document.getElementById("tabla-resultados").appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});
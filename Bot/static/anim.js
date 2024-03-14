document.addEventListener("DOMContentLoaded", function () {
    // Variable global para almacenar el conversationId
    let conversationId = null;

    let matricula = '';
    let idSala = '';
    let dia = '';
    let horaInicio = '';
    let horaSalida = '';
    let recursos = '';
    let personas = '';
    let tempPersonas = '';

    let postMatricula = '';
    let postIdSala = '';
    let postDia = '';
    let postHoraInicio = '';
    let postHoraSalida = '';
    let postRecursos = '';
    let postPersonas = '';

    window.fetchConversationInfo = function () {
        var query = document.getElementById("conversation_query").value;

        // Verificar si el query está vacío
        if (query === "") {
            const errorTitle = document.getElementById("error-title");
            errorTitle.textContent = "Por favor, escribe una mensaje antes de enviar."

            // Mostrar el mensaje de error durante 5 segundos
            setTimeout(() => {
                errorTitle.textContent = ""; // Limpiar el contenido del mensaje después de 5 segundos
            }, 5000); // 5000 milisegundos = 5 segundos

            return; // Salir de la función sin continuar
        }
        else {

            let apiUrl;

            // Si no hay un conversationId almacenado, usar la ruta para iniciar un nuevo chat
            if (!conversationId) {
                apiUrl = `/api/new_chat/${query}`;
                console.log("Esto es un nuevo chat");
            } else {
                // Si hay un conversationId almacenado, usar la ruta para un chat existente
                apiUrl = `/api/existing_chat/${conversationId}/${query}`;
                console.log("Esto es un chat existente");
            }

            // Analizar la consulta para detectar palabras clave y asignar valores a las variables correspondientes
            if (query.toLowerCase().includes('matrícula es')) {
                matricula = obtenerValor(query, 'matrícula es');
            }
            if (query.toLowerCase().includes('sala')) {
                idSala = obtenerValor(query, 'sala');
            }
            if (query.toLowerCase().includes('día sea')) {
                dia = obtenerFechaSQL(query, 'día sea');
            }
            if (query.toLowerCase().includes('hora de inicio a las')) {
                horaInicio = obtenerHoraSQL(query, 'hora de inicio a las');
            }
            if (query.toLowerCase().includes('hora de salida a las')) {
                horaSalida = obtenerHoraSQL(query, 'hora de salida a las');
            }
            if (query.toLowerCase().includes('recursos son')) {
                recursos = obtenerValor(query, 'recursos son');
            }
            if (query.toLowerCase().includes('personas')) {
                tempPersonas = query;
                personas = obtenerNumeroPersonas(query, 'personas');
            }

            // Detectar la frase "terminar la conversación"
            if (query.toLowerCase().includes("terminar la conversación") || query.toLowerCase().includes("terminar esta conversación") || query.toLowerCase().includes("terminar esta reservación") || query.toLowerCase().includes("terminar la conversación")) {
                setTimeout(() => {
                    // Ocultar el div con clase "message_input_wrapper"
                    document.querySelector(".message_input_wrapper").style.display = "none";

                    // Cambiar el texto del div con id "send_button" a "Ver Detalles"
                    var sendButton = document.getElementById("send_button");
                    sendButton.textContent = "Ver Detalles";

                    // Cambiar el evento onclick a "viewDetails()"
                    sendButton.onclick = viewDetails;
                }, 300);
            }

            // Esperar un segundo antes de agregar el mensaje de carga
            setTimeout(() => {
                // Agregar el mensaje de carga
                addLoadingMessage();

                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query: query })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al obtener respuesta del servidor');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Si es la primera solicitud, guardar el conversationId
                        if (!conversationId) {
                            conversationId = data.conversationId;
                        }
                        console.log(data);
                        console.log(conversationId);
                        // Actualizar el mensaje de carga y mostrar la respuesta del bot
                        updateBotMessage(data.answer);
                        console.log(matricula, idSala, dia, horaInicio, horaSalida, recursos, personas);
                    })
                    .catch(error => {
                        console.error(error);
                        // En caso de error, también remueve el mensaje de carga
                        removeLoadingMessage();
                    });
            }, 500); // Espera 500 milisegundos (0.5 segundo)
        }
    };

    function viewDetails() {
        // Seleccionar el elemento contenedor donde se insertará la tabla
        var interText = document.querySelector(".inter-text");

        // Crear una tabla
        var table = document.createElement("table");
        table.classList.add("reservation_summary");
        table.style.margin = '5px';

        // Crear una fila para cada dato
        var rowData = {
            "Matrícula": matricula,
            "ID Sala": idSala,
            "Día": dia,
            "Hora de Inicio": horaInicio,
            "Hora de Salida": horaSalida,
            "Recursos": recursos,
            "Personas": personas
        };

        for (var key in rowData) {
            if (rowData.hasOwnProperty(key)) {
                var row = document.createElement("tr");
                var cell1 = document.createElement("td");
                var cell2 = document.createElement("td");
                cell1.textContent = key;
                cell1.classList.add("column-name"); // Agregar clase para la primera columna
                cell2.textContent = rowData[key];
                row.appendChild(cell1);
                row.appendChild(cell2);
                table.appendChild(row);
            }
        }

        // Limpiar el contenido existente antes de agregar la tabla
        interText.innerHTML = "";

        // Agregar la tabla al contenedor
        interText.appendChild(table);

        const generalDetails = document.getElementById("view_details");
        generalDetails.classList.add("fade-in"); // Agregar la clase fade-in
        generalDetails.style.visibility = 'visible';

        const sendButton = document.getElementById("button_send_message");
        sendButton.style.visibility = 'hidden';

        setTimeout(() => {
            const messages = document.getElementById("all_messages");
            messages.style.height = '450px';
        }, 500);
    }

    window.sendReservation = function () {
        // Obtener el elemento div por su id
        var reservarTodoDiv = document.getElementById("reservar_todo");

        reservarTodoDiv.onclick = '';

        // Analizar la consulta para detectar palabras clave y asignar valores a las variables correspondientes
        if (!matricula.toLowerCase().includes('matrícula es')) {
            postMatricula = matricula;
        }
        if (!idSala.toLowerCase().includes('sala')) {
            postIdSala = idSala;
        }
        if (!dia.toLowerCase().includes('día sea')) {
            postDia = obtenerFechaSQL2(dia);
        }
        if (!horaInicio.toLowerCase().includes('hora de inicio a las')) {
            postHoraInicio = obtenerHoraSQL2(horaInicio);
        }
        if (!horaSalida.toLowerCase().includes('hora de salida a las')) {
            postHoraSalida = obtenerHoraSQL2(horaSalida);
        }
        if (!recursos.toLowerCase().includes('recursos son')) {
            postRecursos = recursos;
        }
        if (tempPersonas.toLowerCase().includes('personas')) {
            postPersonas = obtenerNumeroPersonas(tempPersonas, 'personas');
        }

        // Crear un elemento de imagen
        var imagen = document.createElement("img");

        // Establecer la clase y la fuente de la imagen
        imagen.className = "gif";
        imagen.src = "static/loading.gif";

        // Eliminar cualquier contenido previo del div
        reservarTodoDiv.innerHTML = '';

        // Agregar la imagen al div
        reservarTodoDiv.appendChild(imagen);

        // Datos que deseas enviar como payload (en formato JSON)
        const data = {
            "Matricula": postMatricula,
            "IDSala": postIdSala,
            "Dia": postDia,
            "HoraInicio": postHoraInicio,
            "HoraFin": postHoraSalida,
            "Recursos": postRecursos,
            "Personas": postPersonas
        };

        // URL a la que deseas enviar la solicitud POST
        const url = '/api/reservacion';

        // Configuración de la solicitud
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especifica que el contenido del payload es JSON
            },
            body: JSON.stringify(data) // Convierte los datos a JSON y los establece como cuerpo de la solicitud
        };

        // Realiza la solicitud HTTP
        fetch(url, requestOptions)
            .then(response => response.json()) // Convierte la respuesta a JSON
            .then(data => {
                console.log(data)
                window.location.href = `/congrats`;
            }) // Muestra los datos recibidos en la consola
            .catch(error => console.error('Error:', error));
    };

    // Función para obtener el valor asociado a una palabra clave en la consulta
    function obtenerValor(query, palabraClave) {
        // Busca la palabra clave en la consulta y obtiene el valor después de ella
        const indexPalabraClave = query.indexOf(palabraClave);
        const valor = query.substring(indexPalabraClave + palabraClave.length).trim();
        return valor;
    }

    // Función para obtener la hora en formato de hora SQL
    function obtenerHoraSQL(query, palabraClave) {
        // Busca la palabra clave en la consulta
        const indexPalabraClave = query.indexOf(palabraClave);
        if (indexPalabraClave === -1) {
            return null; // Palabra clave no encontrada en la consulta
        }
        // Obtiene la subcadena después de la palabra clave
        let subcadena = query.substring(indexPalabraClave + palabraClave.length).trim();

        return subcadena;
    }

    // Función para obtener la hora en formato de hora SQL
    function obtenerHoraSQL2(query) {
        // Separar la subcadena en palabras individuales usando una expresión regular
        const palabras = query.match(/\S+/g);

        // Extraer la hora y el período (am/pm) de las palabras
        let hora = null;
        let periodo = null;
        const horaExpresion = /\d+/; // Expresión para buscar un número
        const periodoExpresion = /(am|pm)/i; // Expresión para buscar "am" o "pm"

        for (const palabra of palabras) {
            if (horaExpresion.test(palabra)) {
                // Si la palabra contiene un número, considerarlo como la hora
                hora = parseInt(palabra);
            }
            if (periodoExpresion.test(palabra)) {
                // Si la palabra contiene "am" o "pm", considerarlo como el período
                const match = palabra.match(periodoExpresion);
                if (match) {
                    periodo = match[0].toLowerCase(); // Guardar el período en minúscula
                }
            }
        }

        console.log(hora, periodo);

        // Verificar si se encontraron la hora y el período
        if (hora === null || periodo === null) {
            return null; // Hora o período no encontrados en la subcadena
        }

        // Convertir la hora al formato de 24 horas
        if (periodo === 'pm' && hora !== 12) {
            hora += 12; // Sumar 12 horas para las horas PM, excepto a las 12 PM
        } else if (periodo === 'am' && hora === 12) {
            hora = 0; // Convertir 12 AM a 0 horas
        }

        // Formatear la hora en el formato deseado (HH:mm:ss)
        const horaFormateada = `${hora.toString().padStart(2, '0')}:00:00`;
        return horaFormateada;
    }

    // Función para obtener el número de personas en la consulta
    function obtenerNumeroPersonas(query, palabraClave) {
        // Busca la palabra clave en la consulta
        const indexPalabraClave = query.indexOf(palabraClave);
        // Obtiene la subcadena después de la palabra clave
        const subcadena = query.substring(indexPalabraClave - palabraClave.length).trim();
        // Divide la subcadena en palabras individuales
        const palabras = subcadena.split(' ');
        // Busca el número en las palabras
        for (let palabra of palabras) {
            const numero = parseInt(palabra);
            if (!isNaN(numero)) {
                return numero;
            }
        }
        return 0; // Si no se encuentra un número, devuelve 0
    }

    // Función para obtener el día en formato de fecha SQL
    function obtenerFechaSQL(query, palabraClave) {
        // Busca la palabra clave en la consulta
        const indexPalabraClave = query.indexOf(palabraClave);
        if (indexPalabraClave === -1) {
            return null; // Palabra clave no encontrada en la consulta
        }
        // Obtiene la subcadena después de la palabra clave
        let subcadena = query.substring(indexPalabraClave + palabraClave.length).trim();

        return subcadena;
    }

    // Función para obtener el día en formato de fecha SQL
    function obtenerFechaSQL2(query) {
        // Separar la subcadena en palabras individuales
        const palabras = query.split(' ');

        // Mapeo de nombres de meses en español a inglés
        const meses = {
            'enero': 'January',
            'febrero': 'February',
            'marzo': 'March',
            'abril': 'April',
            'mayo': 'May',
            'junio': 'June',
            'julio': 'July',
            'agosto': 'August',
            'septiembre': 'September',
            'octubre': 'October',
            'noviembre': 'November',
            'diciembre': 'December'
        };

        // Reemplazar los nombres de los meses en español con los nombres en inglés
        for (let i = 0; i < palabras.length; i++) {
            const palabra = palabras[i].toLowerCase();
            if (meses.hasOwnProperty(palabra)) {
                palabras[i] = meses[palabra];
            }
        }

        // Unir las palabras nuevamente en una cadena
        query = palabras.join(' ');

        // Expresión regular para extraer la fecha en formato dd de MMMM de yyyy
        const regexFecha = /(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/;

        // Extraer partes de la fecha usando la expresión regular
        const match = query.match(regexFecha);
        if (!match) {
            return null; // No se encontró ninguna fecha en el formato esperado
        }
        const dia = match[1];
        const mes = match[2];
        const año = match[3];

        // Mapeo de nombres de meses en inglés a números de mes
        const mesesNumeros = {
            'January': '01',
            'February': '02',
            'March': '03',
            'April': '04',
            'May': '05',
            'June': '06',
            'July': '07',
            'August': '08',
            'September': '09',
            'October': '10',
            'November': '11',
            'December': '12'
        };

        // Obtener el número de mes correspondiente
        const mesNumero = mesesNumeros[mes];
        if (!mesNumero) {
            return null; // Mes no válido
        }

        // Formatear la fecha en el formato deseado (YYYY-MM-DD)
        const formattedDate = `${año}-${mesNumero}-${dia}`;
        return formattedDate;
    }

    function addLoadingMessage() {
        var $messages = $('.messages');
        $messages.append('<li id="message_loading" class="message left appeared"><div class="avatar"></div><div class="text_wrapper"><div class="text">Cargando...</div></div></li>');
        $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
    }

    function removeLoadingMessage() {
        $('#message_loading').remove();
    }

    function updateBotMessage(answer) {
        var $messages = $('.messages');
        // Remover el mensaje de carga
        $('#message_loading').remove();
        // Agregar el mensaje del bot con el texto proporcionado
        sendMessage(answer);
    }

    // Agrega un event listener al input
    document.getElementById("conversation_query").addEventListener("keypress", function (event) {
        // Verifica si la tecla presionada es "Enter"
        if (event.key === "Enter") {
            // Ejecuta la función fetchConversationInfo
            fetchConversationInfo();
        }
    });

    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    var getMessageText, message_side, sendMessage;

    message_side = 'right';

    getMessageText = function () {
        var $message_input;
        $message_input = $('.message_input');
        return $message_input.val();
    };

    sendMessage = function (text) {
        var $messages, message;
        if (text.trim() === '') {
            return;
        }
        $('.message_input').val('');
        $messages = $('.messages');
        message_side = message_side === 'left' ? 'right' : 'left';
        message = new Message({
            text: text,
            message_side: message_side
        });
        message.draw();
        return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
    };

    $('.send_message').click(function (e) {
        var messageText = getMessageText();
        sendMessage(messageText); // Envía el mensaje del usuario al chat
    });

    $('.message_input').keyup(function (e) {
        if (e.which === 13) {
            e.preventDefault(); // Evita que se envíe el formulario cuando se presiona Enter
            var messageText = getMessageText();
            sendMessage(messageText); // Envía el mensaje del usuario al chat
        }
    });
    sendMessage('¡Hola soy Dreamy, tu acompañante en esta aventura! Por favor dime, ¿en qué te puedo ayudar?');
});

document.getElementById('toggleButton').addEventListener('click', function () {
    var input = document.getElementById('conversation_query');
    if (input.classList.contains('hidden')) {
        input.classList.remove('hidden');
    } else {
        input.classList.add('hidden');
    }
});
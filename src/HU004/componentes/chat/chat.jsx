import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../HU004.css";
import loadingChat from "../../../assets/chat_loading_4.gif";
import PopUp from "../detalle/Detalle";
import adperfil from "../../../assets/adperfil.png";

const Chat = ({ setLoggedIn, setMatricula }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(true);

  const [matriculita, setMatriculita] = useState("");
  const [salaID, setSalaID] = useState("");
  const [dia, setDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [recursos, setRecursos] = useState("");
  const [personas, setPersonas] = useState("");
  const [confirmada, setConfirmada] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    return savedLoginStatus === "true";
  });
  const [matricula, setMatriculaInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para el mensaje de error
  const [userType, setUserType] = useState("");
  const [threadID, setThreadID] = useState(""); // Nuevo estado para el thread ID

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://dreamlabapidev.azurewebsites.net/api/loginNormal",
        {
          Matricula: matricula,
          Contrasena: password,
        }
      );

      if (response.data && response.status === 200) {
        const { Matricula, Tipo } = response.data;
        const normalizedTipo = Tipo.trim().toLowerCase(); // Normalizar y convertir a minúsculas

        console.log("Matrícula:", Matricula);
        console.log("Tipo de usuario recibido:", Tipo);
        console.log("Tipo de usuario normalizado:", normalizedTipo);
        console.log("Tipo de usuario comparado:", normalizedTipo === "admin");

        setIsLoggedIn(true);
        setLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Guardar estado de sesión en localStorage
        setMatriculita(Matricula);
        setMatricula(Matricula);
        localStorage.setItem("matricula", Matricula);
        setUserType(normalizedTipo);
        setErrorMessage(""); // Limpiar el mensaje de error

        // Redirigir si el usuario es un admin
        if (normalizedTipo === "admin") {
          console.log("Redirigiendo a:", "http://localhost:8080/admin2");
          window.location.replace("http://localhost:8080/admin2");
        }
      } else {
        setErrorMessage("Matrícula o contraseña incorrecta"); // Establecer el mensaje de error
      }
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMessage("Matrícula o contraseña incorrecta");
    }
  };

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  const sendMessage = async (text, side) => {
    if (text.trim() === "") return;

    const newMessage = { text, side };
    setMessages((messages) => [...messages, newMessage]);
    setInputText("");

    // Mostrar mensaje de carga
    const loadingMessage = {
      text: "Cargando...",
      side: "left",
    };
    setMessages((messages) => [...messages, loadingMessage]);

    // Enviar solicitud a la API
    try {
      let response;
      if (!threadID) {
        // Primera interacción, crear thread
        response = await axios.post(
          "https://dreamlabapidev.azurewebsites.net/api/crear_thread",
          { question: text }
        );
        setThreadID(response.data.thread_id);
      } else {
        // Interacciones subsecuentes, interactuar con thread existente
        response = await axios.post(
          "https://dreamlabapidev.azurewebsites.net/api/interactuar_thread",
          { thread_id: threadID, question: text }
        );
      }

      const botResponse = {
        text: response.data.message.content,
        side: "left",
      };
      setMessages((messages) => [...messages, botResponse]);
    } catch (error) {
      console.error("Error al enviar solicitud a la API:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && matriculita) {
      // Realizar solicitud a la API para obtener la foto del perfil
      fetch(
        `https://dreamlabapidev.azurewebsites.net/api/perfil/${matriculita}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Obtener la URL de la foto del perfil
          const fotoUrl = data.Foto;

          // Actualizar el CSS con la URL de la foto del perfil
          document.documentElement.style.setProperty(
            "--right-avatar",
            `url(${fotoUrl})`
          );
        })
        .catch((error) => {
          console.error("Error al obtener la foto del perfil:", error);
        });
    }
  }, [isLoggedIn, matriculita]);

  const handleMessageChange = (event) => {
    setInputText(event.target.value);
  };

  const handleMessageSubmit = () => {
    sendMessage(inputText, "right");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(inputText, "right");
    }
  };

  useEffect(() => {
    const scrollElement = messagesEndRef.current?.parentNode;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const welcomeMessage =
      "¡Hola soy Dreamy, tu acompañante en esta aventura! Para reservar ingresa el ID de la sala que deseas reservar, el día, hora de inicio y hora de salida, los recursos que ocupas y la cantidad de personas que estarán en la sala. Para más información, pregúntame lo que quieras.";

    if (messages.length === 0) {
      setMessages([{ text: welcomeMessage, side: "left" }]);
    }
  }, [messages.length]);

  return (
    <div className="HU004">
      {!isLoggedIn ? (
        <div className="login_formHU004">
          <h2>INICIAR SESIÓN</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Matrícula:</label>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatriculaInput(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Iniciar Sesión</button>
            {errorMessage && <p className="error_message">{errorMessage}</p>}
          </form>
        </div>
      ) : (
        <div className="chat_container">
          <div className="chat_window">
            <div className="top_menuHU004">
              <div className="title">RESERVA TU LUGAR</div>
            </div>
            <a href="/reservationform" className="reservation-link">
              Haz click aquí para reservar de otra manera.
            </a>
            <div className="error">
              <div id="error-title" className="title"></div>
            </div>
            <ul id="all_messages" className="messages">
              {messages.map((msg, index) => (
                <li key={index} className={`message ${msg.side} appeared`}>
                  <div className={`avatar ${msg.side}`}></div>
                  <div className="text_wrapper">
                    <div className="text">{msg.text}</div>
                  </div>
                </li>
              ))}
              <div ref={messagesEndRef} />
            </ul>
            {showMessageInput && (
              <div className="bottom_wrapperHU004 clearfix">
                <div className="message_input_wrapper">
                  <textarea
                    id="message_input"
                    className="message_input"
                    placeholder="Escribe tu mensaje aquí..."
                    value={inputText}
                    onChange={handleMessageChange}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="send_message" onClick={handleMessageSubmit}>
                  <div className="icon"></div>
                  <div className="text">Enviar</div>
                </div>
              </div>
            )}
          </div>
          <div className="popup_button">
            <button onClick={togglePopUp}>Detalles de reservación</button>
          </div>
          {showPopUp && (
            <PopUp
              dia={dia}
              horaInicio={horaInicio}
              horaFin={horaFin}
              salaID={salaID}
              recursos={recursos}
              personas={personas}
              confirmada={confirmada}
              togglePopUp={togglePopUp}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chat.css";
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
        localStorage.setItem("isLoggedIn", "true"); // Guardar estado de sesión en localStorage
        setMatriculita(Matricula);
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

    const newMessage = {
      text,
      side,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");

    if (side === "right") {
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
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    }
  };

  const formatHour = (hora) => {
    const match = hora.match(/(\d{1,2})\s*(am|pm|AM|PM)/i);

    if (match) {
      let horaNumero = parseInt(match[1], 10);
      const ampm = match[2].toLowerCase();

      if (ampm === "pm" && horaNumero !== 12) {
        horaNumero += 12;
      } else if (ampm === "am" && horaNumero === 12) {
        horaNumero = 0;
      }

      const horaFormateada = horaNumero.toString().padStart(2, "0") + ":00:00";
      return horaFormateada;
    } else {
      return null;
    }
  };

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
      "¡Hola soy Dreamy, tu acompañante en esta aventura! Para iniciar sesión, proporciona tu matrícula; después para reservar ingresa el ID de la sala que deseas reservar, el día, hora de inicio y hora de salida, los recursos que ocupas y la cantidad de personas que estarán en la sala. Para más información, pregúntame lo que quieras.";

    if (messages.length === 0) {
      setMessages([{ text: welcomeMessage, side: "left" }]);
    }
  }, [messages.length]);

  return (
    <div>
      {!isLoggedIn ? (
        <div className="login_form">
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
            {/* Muestra el mensaje de error */}
          </form>
        </div>
      ) : (
        <div className="chat_container">
          <div className="chat_window">
            <div className="top_menu">
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
              <div className="bottom_wrapper clearfix">
                <div className="message_input_wrapper">
                  <input
                    className="message_input"
                    placeholder="Escribe tu mensaje..."
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
        </div>
      )}
      {showPopUp && <PopUp toggle={togglePopUp} />}
    </div>
  );
};

export default Chat;

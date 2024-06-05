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
  const confirmada = 0;
  const [showPopUp, setShowPopUp] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    return savedLoginStatus === "true";
  });
  const [matricula, setMatriculaInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [threadID, setThreadID] = useState("");
  const [inputError, setInputError] = useState("");

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
        const normalizedTipo = Tipo.trim().toLowerCase();

        setIsLoggedIn(true);
        setLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        setMatriculita(Matricula);
        setMatricula(Matricula);
        localStorage.setItem("matricula", Matricula);
        setUserType(normalizedTipo);
        setErrorMessage("");

        if (normalizedTipo === "admin") {
          window.location.replace("https://green-ground-02320f30f.5.azurestaticapps.net/admin2");
        }
      } else {
        setErrorMessage("Matrícula o contraseña incorrecta");
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
    if (text.trim() === "") {
      setInputError("No has ingresado ninguna solicitud a Dreamy");
      setTimeout(() => {
        setInputError("");
      }, 3000);
      return;
    }

    setInputError(""); // Clear previous error if any

    const newMessage = { text, side };
    setMessages((messages) => [...messages, newMessage]);
    setInputText("");

    // Mostrar mensaje de carga
    const loadingMessage = {
      text: "Cargando...",
      side: "left",
    };
    const loadingMessageIndex = messages.length + 1; // Añadimos +1 porque ya hemos añadido el mensaje del usuario.
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
        const newThreadID = response.data.thread_id;
        setThreadID(newThreadID);
        localStorage.setItem("threadID", newThreadID);
      } else {
        const thread_ID = localStorage.getItem("threadID");
        // Interacciones subsecuentes, interactuar con thread existente
        response = await axios.post(
          "https://dreamlabapidev.azurewebsites.net/api/interactuar_thread",
          { thread_id: thread_ID, question: text }
        );
      }

      const botResponse = {
        text: response.data.message.content,
        side: "left",
      };

      // Reemplazar el mensaje de "Cargando..." con la respuesta del bot
      setMessages((messages) => {
        const updatedMessages = [...messages];
        updatedMessages[loadingMessageIndex] = botResponse;

        // Verificar si la respuesta contiene "enviada para ser procesada"
        if (botResponse.text.toLowerCase().includes("enviada")) {
          // Usar expresiones regulares para extraer la información
          const salaRegex = /sala (\w+)/i;
          const fechaRegex = /(\d+ de \w+ de \d+)/i;
          const horaRegex =
            /(\d{1,2}(?::\d{2})?\w{2}) a (\d{1,2}(?::\d{2})?\w{2})|(\d{1,2}(?::\d{2})?)\s*:\s*(\d{2}) hasta las (\d{1,2}(?::\d{2})?)|(?:desde las\s*)?(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*hasta las\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i;
          const recursosRegex =
            /con (\d+ \w+(?:,|\sy\s)\d+ \w+)|(\d+ \w+(?:,|\sy\s)\d+ \w+)|con los recursos de ([^,]+(?:, [^,]+)* y [^,]+)/i;
          const personasRegex = /(\d+) personas/i;

          const salaMatch = botResponse.text.match(salaRegex);
          const fechaMatch = botResponse.text.match(fechaRegex);
          const horaMatch = botResponse.text.match(horaRegex);
          const recursosMatch = botResponse.text.match(recursosRegex);
          const personasMatch = botResponse.text.match(personasRegex);

          console.log(
            salaMatch,
            fechaMatch,
            horaMatch,
            recursosMatch,
            personasMatch
          );

          if (
            salaMatch &&
            fechaMatch &&
            horaMatch &&
            recursosMatch &&
            personasMatch
          ) {
            const horaInicio = horaMatch[1] || horaMatch[6] || horaMatch[4];
            const horaFin = horaMatch[2] || horaMatch[7] || horaMatch[5];
            const recursos =
              recursosMatch[1] || recursosMatch[2] || recursosMatch[3];

            setSalaID(salaMatch[1]);
            setDia(convertirFecha(fechaMatch[1]));
            setHoraInicio(convertirHora(horaInicio));
            setHoraFin(convertirHora(horaFin));
            setRecursos(recursos);
            setPersonas(parseInt(personasMatch[1]));

            setShowButton(true);
            setShowMessageInput(false);
          }
        }

        return updatedMessages;
      });
    } catch (error) {
      console.error("Error al enviar solicitud a la API:", error);
      // Opcional: podrías manejar el error aquí, como eliminar el mensaje de "Cargando..."
      setMessages((messages) =>
        messages.filter((_, index) => index !== loadingMessageIndex)
      );
    }
  };

  useEffect(() => {
    const savedThreadID = localStorage.getItem("threadID");
    if (savedThreadID) {
      setThreadID(savedThreadID);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && matriculita) {
      fetch(
        `https://dreamlabapidev.azurewebsites.net/api/buscar_thread_activo?matricula=${matriculita}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.thread_id) {
            setThreadID(data.thread_id);
            localStorage.setItem("threadID", data.thread_id);
          }
        })
        .catch((error) =>
          console.error("Error fetching active thread:", error)
        );
    }
  }, [isLoggedIn, matriculita]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {!isLoggedIn ? (
        <div className="login-container">
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatriculaInput(e.target.value)}
              placeholder="Matrícula"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <button type="submit">Iniciar Sesión</button>
            <div className={`errorHU004 ${errorMessage ? "show" : ""}`}>
              <span className="title">{errorMessage}</span>
            </div>
          </form>
        </div>
      ) : (
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.side}`}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {showMessageInput && (
            <div className="chat-input">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") sendMessage(inputText, "right");
                }}
                placeholder="Escribe un mensaje..."
              />
              <button onClick={() => sendMessage(inputText, "right")}>
                Enviar
              </button>
            </div>
          )}
          {inputError && (
            <div className="errorHU004 show">
              <div className="title">{inputError}</div>
            </div>
          )}
          {showButton && (
            <button onClick={togglePopUp} className="buttonHU004">
              Confirmar Datos
            </button>
          )}
          {showPopUp && (
            <PopUp
              togglePopUp={togglePopUp}
              salaID={salaID}
              dia={dia}
              horaInicio={horaInicio}
              horaFin={horaFin}
              recursos={recursos}
              personas={personas}
              confirmada={confirmada}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;

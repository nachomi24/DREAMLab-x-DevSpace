import { useState, useEffect, useRef } from "react";
import "./chat.css";
import loadingChat from "../../../assets/chat_loading_4.gif";

const Chat = ({ setLoggedIn, setMatricula }) => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("chatMessages")) || []
  );
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Función para enviar un mensaje al chat y recibir una respuesta de la API
  const sendMessage = async (text, side) => {
    if (text.trim()) {
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
        const response = await fetch(
          `https://devspaceapi.azurewebsites.net/api/chat_OpenAI/${text}`
        );
        const data = await response.json();

        // Eliminar mensaje de carga y agregar respuesta del bot
        setMessages((messages) => [
          ...messages.filter((msg) => msg !== loadingMessage),
          { text: data, side: "left" },
        ]);

        // Verificar si el mensaje contiene una matrícula
        const matriculaRegex = /(A0\d{7}|L0\d{7})/i;
        const match = text.match(matriculaRegex);

        if (match) {
          const nuevaMatricula = match[1]; // Obtener la matrícula del mensaje
          setMatricula(nuevaMatricula); // Actualizar el estado de la matrícula
          setLoggedIn(true); // Establecer el estado de inicio de sesión como verdadero

          // Guardar la matrícula y el estado de inicio de sesión en localStorage
          localStorage.setItem("matricula", nuevaMatricula);
          localStorage.setItem("loggedIn", true);
        } else {
          console.log("El mensaje no contiene una matrícula.");
        }
      } catch (error) {
        console.error("Error al enviar solicitud a la API:", error);
      }
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
      // Asegura que no se envíe al presionar Enter y Shift simultáneamente.
      event.preventDefault(); // Previene el salto de línea en el textarea.
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
    // Guardar mensajes en localStorage
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    // Mensaje de bienvenida inicial
    const welcomeMessage =
      "¡Hola soy Dreamy, tu acompañante en esta aventura! Para iniciar sesión, proporciona tu matrícula; después para reservar ingresa el ID de la sala que deseas reservar, el día, hora de inicio y hora de salida, los recursos que ocupas y la cantidad de personas que estarán en la sala. Para más información, pregúntame lo que quieras.";

    // Agregar el mensaje al chat si no hay mensajes guardados
    if (messages.length === 0) {
      setMessages([{ text: welcomeMessage, side: "left" }]);
    }
  }, [messages.length]);

  // localStorage.clear();

  return (
    <div className="chat_window">
      <div className="top_menu">
        <div className="title">RESERVA TU LUGAR</div>
      </div>
      <div className="error">
        <div id="error-title" className="title"></div>
      </div>
      <ul id="all_messages" className="messages">
        {messages.map((msg, index) => (
          <li key={index} className={`message ${msg.side} appeared`}>
            <div className="avatar"></div>
            <div className="text_wrapper">
              <div className="text">{msg.text}</div>
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="bottom_wrapper clearfix"
      >
        <div className="message_input_wrapper">
          <textarea
            style={{ resize: "none" }}
            id="conversation_query"
            className="message_input"
            placeholder="Escribe aquí..."
            value={inputText}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
          ></textarea>
        </div>
        <div
          id="button_send_message"
          className="send_message"
          onClick={handleMessageSubmit}
        >
          <div id="send_button" className="text">
            Enviar
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

import React, { useState, useEffect, useRef } from 'react';
import './chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const sendMessage = (text, side) => {
        if (text.trim()) {
            const newMessage = { text, side };
            setMessages(messages => [...messages, newMessage]);
            setInputText('');
        }
    };

    const handleMessageChange = (event) => {
        setInputText(event.target.value);
    };

    const handleMessageSubmit = () => {
        sendMessage(inputText, 'right');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) { // Asegura que no se envíe al presionar Enter y Shift simultáneamente.
            event.preventDefault(); // Previene el salto de línea en el textarea.
            sendMessage(inputText, 'right');
        }
    };
    
    useEffect(() => {
        const scrollElement = messagesEndRef.current?.parentNode;
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    }, [messages]);
    
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
            <div style={{display: 'flex', justifyContent: 'center'}} className="bottom_wrapper clearfix">
                <div className="message_input_wrapper">
                    <textarea
                        style={{resize: 'none'}}
                        id="conversation_query"
                        className="message_input"
                        placeholder="Escribe aquí..."
                        value={inputText}
                        onChange={handleMessageChange}
                        onKeyPress={handleKeyPress}
                    ></textarea>
                </div>
                <div id="button_send_message" className="send_message" onClick={handleMessageSubmit}>
                    <div id="send_button" className="text">Enviar</div>
                </div>
            </div>
        </div>
    );
};

export default Chat;

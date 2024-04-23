import React from 'react';
import './chat.css'; 

const Chat = () => {
    return (
        <div className="chat_window">
            <div className="top_menu">
                <div className="title">RESERVA TU LUGAR</div>
            </div>
            <div className="error">
                <div id="error-title" className="title"></div>
            </div>
            <ul id="all_messages" className="messages"></ul>
            <div style={{display: 'flex', justifyContent: 'center'}} className="bottom_wrapper clearfix">
                <div className="message_input_wrapper">
                    <textarea style={{resize: 'none'}} id="conversation_query" className="message_input" placeholder="Escribe aquí..."></textarea>
                </div>
                <div id="button_send_message" className="send_message">
                    <div id="send_button" className="text">Enviar</div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
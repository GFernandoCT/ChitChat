import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';

const ModeloMensaje = (props) => {
    const [value, setValue] = useState('');
    const {chatId,creds} = props;


const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();

    if(text.length > 0) sendMessage(creds, chatId, { text });
}
    const handleChange = (event) =>{
        setValue(event.target.value);

        isTyping(props, chatId);
    }
    
    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input 
                className="message-input"
                placeholder="Enviar un mensaje..."
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
                />
        </form>
    );
}

export default ModeloMensaje;
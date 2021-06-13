import {useState} from 'react';
import {sendMessage, isTyping} from 'react-chat-engine';
import {SendOutlined, PictureOutlined} from '@ant-design/icons';


const ModeloMensaje = (props) => {
    const [value, setValue] = useState('');
    const {chatId,creds} = props;
    
const enviarManejado = (event) => {
    event.preventDefault();

    const text = value.trim();

    if(text.length > 0) sendMessage(creds, chatId, { text });
    
    setValue('');
}
    const cambioManejado = (event) =>{
        setValue(event.target.value);
    }

    const subirManejado = (event) => {
        sendMessage(creds,chatId,{ files: event.target.files, text: ''})
    }
    
    return (
        <form className="message-form" onSubmit={enviarManejado}>
            <input 
                className="message-input"
                placeholder="Enviar un mensaje..."
                value={value}
                onChange={cambioManejado}
                onSubmit={enviarManejado}
                />
                <label htmlFor="upload-button">
                    <span className="image-button">
                        <PictureOutlined className="picture-icon"/>
                    </span>
                </label>
                <input type="file" multiple={false} id="upload-button" style={{display: 'none'}} onChange={subirManejado.bind(this)}/>
                <button type="submit" className="send-button">
                    <SendOutlined className="send-icon"></SendOutlined>
                </button>
        </form>
    );
}

export default ModeloMensaje;
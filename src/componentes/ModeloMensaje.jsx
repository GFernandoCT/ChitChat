import {useState} from 'react';
import {sendMessage, isTyping} from 'react-chat-engine';
import {SendOutlined, PictureOutlined} from '@ant-design/icons';
import axios from 'axios';


const ModeloMensaje = (props) => {
    const [value, setValue] = useState('');
    const {chatId,creds} = props;
    
     const guardarMensaje = () => {
         var chatIdentificador = chatId;

         axios.post("http://localhost:3001/api/guardarMensaje",
         {idChat: chatIdentificador,
         nombreUser: localStorage.getItem('usuario'), 
         mensaje: value.trim(),
         fechaLog: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
     }).then (() => {
         alert("Se ha conseguido insertar el dato en la bbdd")
     });
     }

const enviarManejado = (event) => {
    event.preventDefault();
    const text = value.trim();

   
    if(text.length > 0)  sendMessage(creds, chatId, { text }, guardarMensaje());
    
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
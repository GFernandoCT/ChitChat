import React,{useState} from 'react';

import { NewChatForm } from 'react-chat-engine';
import { newChat } from 'react-chat-engine';
import { LogoutOutlined } from '@ant-design/icons';

const CrearChat = (props) => {


    const [palabra, cambiarTitulo] = useState('');
    const callback = (data) => console.log(data)

    const prueba1 = (event) =>{
        cambiarTitulo(event.target.value);
    }

    const crearChatNuevo= (event) =>{
        event.preventDefault();
        
        const titulo = palabra.trim();

        if(palabra.length > 0)
        newChat(
            props,{'title':titulo},callback
        )

        cambiarTitulo('');
        
    }

    const botonPrueba = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password')
        window.location.reload();
    }

    return (
        <div className="ce-chat-form-container" >
            <div className="chat-title-container"> 
            <h1 className="chat-title">Chit Chat
            </h1>
            <button onClick={botonPrueba}>
                    <LogoutOutlined  className="picture-icon" style={{ float: 'right' }}/>
            </button>
            </div>
            <div className="centrar">
                <form className="message-form" onSubmit={crearChatNuevo}>
                <input className="message-input"  placeholder="¡Crea un nuevo chat!" value={palabra} onChange={prueba1} onSubmit={crearChatNuevo}/>
                </form>
            </div>
            

        </div>
    )
}

export default CrearChat;
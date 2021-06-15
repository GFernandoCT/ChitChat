import React,{useState} from 'react';
import { newChat } from 'react-chat-engine';
import { LogoutOutlined } from '@ant-design/icons';

//Este archivo JSX nos va a servir para poder crear nuestros chats ademas de que poder cerrar sesión
// cuando le deseemos


// Esta const creara el chat con una funcion propia de la API de Chat Engine
// Para ello necesitaremos una serie de datos que vamos a sacar de props (los datos que se envian desde App.js)
// También sera necesario un titulo para el chat y un funcion de callback
const CrearChat = (props) => {  

    // Para el titulo vamos a usar useState y en el callback vamos a devolver un log con los datos del chat
    const [titulo, cambiarTitulo] = useState('');
    const callback = (data) => console.log(data)

    // Esta const sirve para ir cambiando el titulo a medida que se vaya escribiendo en el input de texto
    const actualizarTitulo = (event) =>{
        cambiarTitulo(event.target.value);
    }


    // Finalmente en este const usamos la funcionalidad newChat() pasandole los datos necesarios
    // ademas de comprobar si el titulo tiene espacios en blanco al principio y al final
    // y que si el input esta vacio no se cree uno nuevo. Finalmente reseteamos el input para dejarlo en blanco
    const crearChatNuevo= (event) =>{
        event.preventDefault();

        const datosLog = { 'Project-ID': "aaed14ce-2955-4169-99f9-21adb93dbd68", 
        'User-Name': localStorage.getItem('usuario'), 
        'User-Secret': localStorage.getItem('clave')};

        const tituloFinal = titulo.trim();
        
        if(tituloFinal.length > 0)
        newChat(
            props,{'title':tituloFinal},callback
        )
        cambiarTitulo('');      
    }

    // Para cerrar sesion simplemente borramos del localStorage usuario, clave y relanzamos la página
    const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('clave')
        window.location.reload();
    }

    // Estructura html. LogoutOutlined es un componente que nos permite cargar un icono de forma sencilla
    return (
        <div className="ce-chat-form-container" >
            <div className="chat-title-container"> 
            <h1 className="chat-title">Chit Chat
            </h1>
            <button onClick={cerrarSesion}>
                    <LogoutOutlined  className="picture-icon" style={{ float: 'right' }}/>
            </button>
            </div>
            <div className="centrar">
                <form className="message-form" onSubmit={crearChatNuevo}>
                <input className="message-input"  placeholder="¡Crea un nuevo chat!" value={titulo} onChange={actualizarTitulo} onSubmit={crearChatNuevo}/>
                </form>
            </div>
            

        </div>
    )
}

export default CrearChat;
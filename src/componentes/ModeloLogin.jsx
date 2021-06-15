import { useState } from 'react';
import axios from 'axios';


// Axios es la herramienta que nos permite realizar AJAX, es decir cargar nuevos datos en nuestra página sin 
// la necesidad de tener que recargarla

const LoginFormulario = () => {

    // Usamos useState que es un herramienta muy util reciente para poder cambiar el estado sin necesidad
    // de crear una clase. En este caso set* 
    const [usuario,setUsuario] = useState('');
    const [contraseña,setContraseña] = useState('');
    const [errores,setError] = useState('');
    

    // Esta es la const que nos va a permitir guardar los logins realizados en nuestra aplicación junto axios
    // Axios.post hace una llamada a una url de nuestro backend en formato post con el fin de realizar un insert
    // en nuestro esquema. En este caso queremos almacenar el usuario y la fecha en la que iniciar sesión
    const guardarInicio = () => {

        axios.post("http://localhost:3001/api/insert",
        {nombreUser: usuario, 
        fechaLog: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    }).then (() => {
        alert("Se ha conseguido insertar el dato en la bbdd")
    });
    }


    
    const subirManejado = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': "aaed14ce-2955-4169-99f9-21adb93dbd68", 'User-Name': usuario, 'User-Secret': contraseña };

        try {

            // usuario | contraseña => chatengine -> give messages
            await axios.get('https://api.chatengine.io/chats',{ headers: authObject });
            
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('clave', contraseña);

            guardarInicio();

            window.location.reload();
            setError('');
        } catch (error) {
            setError('Los datos no son correctos, intentalo de nuevo.');
        }

        // usuario / contraseña => chatEngine => devolver inicio
        // correcto => logea dentro
        // error => vuelve a intentarlo
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chit Chat</h1>
                <form onSubmit={subirManejado}>
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="input" placeholder="Usuario" required />
                    <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="input" placeholder="Contraseña" required />
                    <div align="center">
                        <button type="submit" className="button"> 
                            <span>Bienvenido!</span>
                        </button>
                    </div>
                </form>
                <h2 className="error">{errores}</h2>
            </div>
        </div>
    );
}

export default LoginFormulario;
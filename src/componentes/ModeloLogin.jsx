import { useState } from 'react';
import axios from 'axios';

const LoginFormulario = () => {
    const [usuario,setUsuario] = useState('');
    const [contraseña,setContraseña] = useState('');
    const [errores,setError] = useState('');

    const subirManejado = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': "aaed14ce-2955-4169-99f9-21adb93dbd68", 'User-Name': usuario, 'User-Secret': contraseña };

        try {

            // usuario | contraseña => chatengine -> give messages
            await axios.get('https://api.chatengine.io/chats',{ headers: authObject });
            
            localStorage.setItem('username', usuario);
            localStorage.setItem('password', contraseña);

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
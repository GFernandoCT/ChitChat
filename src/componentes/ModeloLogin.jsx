import { useState } from 'react';
import axios from 'axios';

const LoginFormulario = () => {
    const [usuario,setUsuario] = useState('');
    const [contraseña,setContraseña] = useState('');

    const subirManejado = (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': "aaed14ce-2955-4169-99f9-21adb93dbd68", 'User-Name': username, 'User-Secret': password };

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
                    <input type="text" value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="input" placeholder="Contraseña" required />
                    <div align="center">
                        <button type="submit" className="button"> 
                            <span>Bienvenido!</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
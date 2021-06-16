import ModeloMensaje from './ModeloMensaje';
import MiMensaje from './MiMensaje';
import OtroMensaje from './OtroMensaje';
import React from 'react'


// Para que la API pueda cargar los datos de la aplicación vamos a necesitar que guarde unos valores
const ChatCuerpo = (props) => {
    const{ chats, activeChat, userName, messages } = props;
    const chat = chats && chats[activeChat];

    //Esta const es la que se encarga de que en los mensajes se indique quien a leido el mensaje
    //Le pasamos 2 valores que en nuestro caso seran 2 componentes React
    //La primera es el mensaje en sí y la segunda depende de quien haya enviado el mensaje (Nosotros u otra persona)
    //Nos acaba devolviendo unas etiquetas html junto al JSX del mensaje que se acabaran lanzando junto al cuerpo 
    //de este mismo documento
    const estadoMensaje = (message, isMyMessage) => 
        chat.people.map((person,index) => person.last_read === message.id && (
            <div key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage? 'right' : 'left',
                    backgroundImage: person.person.avatar && `url(${person.person.avatar})`
                }}
            />
        ));
    
 
    //Esta const es la principal de ChatCuerpo pues se encarga de mostrar todos los mensajes de nuestro chat
    //Primero extrae la información que guardamos en messages (la información de todos los mensajes del chat)
    // y los almacenamos en forma de mapa
    //Los mensajes se ordenan por su indice y guardamos el ultimo mensaje enviado que usaremos posteriormente 
    // para mostrar si esta leido o no
    //También comprobamos que los mensajes que encontramos no sean nuestros pues les tendríamos que asignar un estilo diferente
    const mostrarMensajes = () => {
        const keys = Object.keys(messages);

        return keys.map((key,index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const esMiMensaje = userName === message.sender.username;
        
            // A la hora de devolver el html correspondiente comprobamos el emisor del mensaje, en caso de que sea asi
            // cargamos un JSX de MiMensaje y en el caso opuesto de OtroMensaje
            // Hacemos lo mismo para mostrar si un mensaje es leido o no pero en este caso solo cambiamos el estilo de
            //  la etiqueta
            // Finalmente cargamos la const que hemos creado anteriormente para que se cargue la logica de estadoMensaje()
            //  mostrando una pequeña burbuja con la imagen del usuario que ha leido el mensaje 
            return (
                <div key={`msg_${index}`} style={{ width: '100%'}}>
                    <div className="message-block">
                        {
                            esMiMensaje
                            ? <MiMensaje message={message} />
                            : <OtroMensaje message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: esMiMensaje ? '18px' : '0px', marginLeft: esMiMensaje ? '0px' : '68px'}}>
                        {estadoMensaje(message, esMiMensaje)}
                    </div> 
                </div>
            );
        })
    }

    // Esto tiene la finalidad de que cuando los mensajes aun no se han cargado se muestre un pequeño texto
    if(!chat) return 'Cargando mensajes...';

    //console.log(chat.people.map((person) => ` ${ person.person.username}`));

    console.log(props)

    // Finalmente creamos la estructura html deseada utilizando "plantillas literales" como {chat.title} para cargar ciertos valores
    // sin tener que añadirlos a una variable
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${ person.person.username}`)}
                </div>
            </div>
            {mostrarMensajes()}
            
            <div style = {{ height: '100px' }}/>
            <div className="message-form-container">    
                <ModeloMensaje {...props} chatId={activeChat} />
            </div>
        </div>
    );
}

export default ChatCuerpo;
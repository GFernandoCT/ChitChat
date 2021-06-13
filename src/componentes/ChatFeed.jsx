import ModeloMensaje from './ModeloMensaje';
import MiMensaje from './MiMensaje';
import OtroMensaje from './OtroMensaje';

import React from 'react'

const ChatFeed = (props) => {
    const{ chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];

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
    
 
    const mostrarMensajes = () => {
        const keys = Object.keys(messages);

        //console.log(keys);

        return keys.map((key,index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const esMiMensaje = userName === message.sender.username;
        
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

    if(!chat) return 'Cargando mensajes...';

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

export default ChatFeed;
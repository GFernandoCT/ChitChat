import React from 'react'

import { ChatEngineWrapper, Socket, ChatSettings } from 'react-chat-engine'
import ConfiguracionChat from './ConfiguracionChat';


const ChatSettingsExample = (props) => {

    const{ chats, activeChat, userName, messages } = props;

    console.log(props);

    return (
            <ChatSettings {...props} />  
    )
}

export default ChatSettingsExample
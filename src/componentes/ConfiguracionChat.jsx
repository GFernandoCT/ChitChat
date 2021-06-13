import { OptionsSettings } from 'react-chat-engine';

const ConfiguracionChat = (props) => {

    const {chatId,activeChat,creds} = props;

    console.log(props);


    return (
            <OptionsSettings {...props}/>  

    )
}

export default ConfiguracionChat;
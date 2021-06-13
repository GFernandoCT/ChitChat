import './App.css';

import { ChatEngine} from 'react-chat-engine';

import ModeloLogin from './componentes/ModeloLogin';
import ChatFeed from './componentes/ChatFeed';
import CrearChat from './componentes/CrearChat';
import ChatListExample from './componentes/ListaChats';
import OpcionesChat from './componentes/OpcionesChat';
import ChatSettingsExample from './componentes/OpcionesChat';
import ConfiguracionChat from './componentes/ConfiguracionChat';


const App = () => {

  if(!localStorage.getItem('username')) return <ModeloLogin/>

  return (
    <ChatEngine
        height="100vh"
        projectID="aaed14ce-2955-4169-99f9-21adb93dbd68"
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
        //renderChatSettings={(chatAppProps) => <ChatSettingsExample {...chatAppProps}/>}
        //renderOptionsSettings={(chatAppProps) => <ConfiguracionChat {...chatAppProps}/>}
        //renderChatList={(chatAppProps) => <ChatListExample {...chatAppProps}/>}
        renderNewChatForm={(chatAppProps) => <CrearChat {...chatAppProps}/>}
    />
    
  );
  
}

export default App;

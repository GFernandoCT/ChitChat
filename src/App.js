import './App.css';
import {ChatEngine} from 'react-chat-engine';
import ModeloLogin from './componentes/ModeloLogin';
import ChatFeed from './componentes/ChatCuerpo';
import CrearChat from './componentes/CrearChat';

const App = () => {

// if para en caso de que no tengamos ningún usuario cacheado salga nuestra
// página de autenticación
  if(!localStorage.getItem('usuario')) return <ModeloLogin/>

// Componentes que son cargados en DOM 
  return (
    <ChatEngine
        height="100vh"
        projectID="aaed14ce-2955-4169-99f9-21adb93dbd68"
        userName={localStorage.getItem('usuario')}
        userSecret={localStorage.getItem('clave')}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
        renderNewChatForm={(chatAppProps) => <CrearChat {...chatAppProps}/>}
    />
  );
}

export default App;

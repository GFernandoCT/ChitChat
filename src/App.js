import './App.css';

import { ChatEngine} from 'react-chat-engine';

import ModeloLogin from './componentes/ModeloLogin';
import ChatFeed from './componentes/ChatFeed';

const App = () => {

  if(!localStorage.getItem('username')) return <ModeloLogin/>


  return (
    <ChatEngine
        height="100vh"
        projectID="aaed14ce-2955-4169-99f9-21adb93dbd68"
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
    />
  );
}

export default App;

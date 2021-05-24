import './App.css';
import { ChatEngine} from 'react-chat-engine';
import ChatFeed from './componentes/ChatFeed';

const App = () => {
  return (
    <ChatEngine
        height="100vh"
        projectID="aaed14ce-2955-4169-99f9-21adb93dbd68"
        userName="Fernando"
        userSecret="123"
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
    />
  );
}

export default App;

import React,{useState} from 'react'


import {getOrCreateChat,ChatList} from 'react-chat-engine'



const ChatListExample = (props) => {

	const chat = {"usernames": ["Paco Pruebas", "Fernando Correa"]};

	const authObject = {'Project-ID': 'aaed14ce-2955-4169-99f9-21adb93dbd68', 'User-Name': 'Fernando', 'User-Secret': '123'}

	const callback = (chat) => console.log(chat)
    const [username, setUsername] = useState('')

	function createDirectChat() {
		console.log(username)
		getOrCreateChat(
			props,
			chat,
			callback
			
		)
		console.log("hemos llegado aqui")
	}

	function renderChatForm() {
		return (
			
			<div className="ce-chat-form-container">
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button className="send-button" onClick={() => createDirectChat()}>
					Create
				</button>
			</div>
			
		)
	}

    return (
        <div class="">
            <ChatList 
				
            />{renderChatForm()}
            
            </div>



    )
}


export default ChatListExample;
import React ,{useContext,useEffect,useState} from 'react';
import {UserContext} from '../../UserContext';
import {Link, useParams} from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import Messages from './messages/Messages'
let socket;
function Chat() {
    const ENDPOINT ='localhost:5000';
    const {room_id,room_name} =useParams();
    const {user,setUser} = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    //joining that user to this room in the server side
    useEffect(() => {
        socket = io(ENDPOINT);
        user&&socket.emit('join',{name:user.name,room_id,user_id:user._id})
        &&socket.on('get-history',res=>{
            setMessages(res)
            console.log(res)
        })
        
            return () => {
            socket.emit('disconnect');
            socket.off();  
            }
    }, []);
    
    //listen to this room messages broadcast
    useEffect(() => {
        user&& socket.on('message',msg=>{
            setMessages([...messages,msg])
            console.log('getting massege',msg)
        })
        console.log('messages',messages)
    }, [messages])

    const sendMessage = e =>{
        e.preventDefault();
        if(message){
            console.log('sending massege',message)
            socket.emit('sendMessage',message,room_id,()=>setMessage(''));
        }
    }
    return (
        user&&<div>
             <div>{room_id} {room_name}</div>
            <h5>{user.name}</h5>
            {/* <h4>Chat {JSON.stringify(user,null,'\t')}</h4> */}
            {/* <pre> {messages.length? JSON.stringify(messages,null,'\t'):null}</pre> */}
            <Messages messages={messages} user_id={user._id}/>
            <form onSubmit={sendMessage}>
                <input type="text" value={message} 
                onChange={e=>setMessage(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&& sendMessage(e)}/>
                <button>send message</button>
            </form>
        </div>
    )
}

export default Chat

import React, {useContext, useState,useEffect} from 'react';
import {UserContext} from '../../UserContext'
import {useHistory} from 'react-router-dom'
import RoomList from './RoomList';
import io from 'socket.io-client';

let socket;
const Home=()=> {
    const ENDPOINT ='localhost:5000';
    const {user,setUser} = useContext(UserContext);
    const [room,setRoom] =useState('');
    const [rooms,setRooms] =useState([]);
    let history=useHistory();


    useEffect(() => {
        socket = io(ENDPOINT);
        // socket.on("connect", () => {
        //     console.log(socket.id); 
        //   });
        return () => {
          socket.on('disconnect');
          socket.off();  
        }
    }, [ENDPOINT])

    useEffect(() => {
        socket.on('output-rooms',res=>{
            setRooms(res)
        })
    }, [])

    useEffect(() => {
        socket.on('room-created',newRoom=>{
            setRooms([...rooms,newRoom]);
            console.log({rooms});
        })
    }, [rooms])

    useEffect(() => {
        if(!user){
            console.log('no user')
             history.push('/login') 
        }
    }, [user])

   

    const handleSubmit = e =>{
        e.preventDefault();
        socket.emit('create-room', room);
        console.log(room);
        setRoom('');
    }
        
    return (
        <div>
             <div class="row">
                <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">{`Welcome ${user?user.name:''}` } </span>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-field ">
                                <input placeholder="Enter room name" value={room} onChange={(e)=>setRoom(e.target.value)} id="room" type="text" className="validate"/>
                                <label htmlFor="room">Room</label>
                            </div>
                        </div>
                        <button className="btn">Create new room</button>
                    </form>
                    </div>
                </div>
                </div>
                    <div className= "col m6 s5 offset-1">
                        <RoomList rooms={rooms}/>
                    </div>
            </div>
        </div>
    )
}

export default Home

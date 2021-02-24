const express = require('express');
const app = express()
var cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoDB= "mongodb+srv://badishay:20212021@cluster0.cu82h.mongodb.net/chat-database?retryWrites=true&w=majority";
mongoose.connect(mongoDB).then(()=>console.log('connected to DB')).catch(err=>console.log(err))
const PORT=process.env.PORT || 5000
const {addUser,getUser,removeUser} = require('./helper');
const Room = require('./models/Room');
const Message = require('./models/Message');
// const User = require('./models/User');

const corseOptions={
 origin: 'http://localhost:3000',
 credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corseOptions))
app.use(express.json())//body parser
app.use(cookieParser())
app.use(authRoutes)

// app.get('/set-cookies',(req,res)=>{
//   res.cookie('username','Tony')
//   res.cookie('isAutenticated',true,{maxAge:24*60*60*60*1000})
//   res.send('cookies are set')
// })
// app.get('/get-cookies',(req,res)=>{
//   const cookies= req.cookies;
//   console.log(cookies)
//   res.json(cookies)
// })

io.on('connection', (socket) => {
   console.log(socket.id);
   Room.find().then(res=>socket.emit('output-rooms',res))
   
  socket.on('create-room', name=>{
    const room  = new Room({name});
    room.save().then(res=>{
      io.emit('room-created',res);
    })
      // console.log(`the room name recived is ${name}`);
  })
  
  socket.on('join', ({name,room_id,user_id})=>{
    const {error,user} = addUser({socket_id:socket.id,name,user_id,room_id});
    socket.join(room_id) //addind this user to room to recive broadcast messages of this room
    //io.to(room_id).emit('message',res);
    Message.find({room_id:room_id},function(err,res){
      if(err){
        return
      }
      socket.emit('get-history',res)
    })
    if(error){
      console.log('join error',error);
    }
    else{
      console.log(`server join ${user.name} to room id:${user.room_id}`);
    }
  })
  socket.on('sendMessage', (message,room_id,callback)=>{
    const user = getUser(socket.id)
    const msg = new Message( {
      name: user.name,
      user_id: user.user_id,
      room_id: user.room_id,
      text: message

    })
    msg.save().then(res=>{
      console.log('message info:', msg);
      io.to(room_id).emit('message',res);
      callback();   
    })
  });
  //distractor
  socket.on('disconnect',()=>{
    removeUser(socket.id)
  })
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
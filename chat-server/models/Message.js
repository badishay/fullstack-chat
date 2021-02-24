const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        user_id:{
            type:String,
            required: true
        },
        room_id:{
            type:String,
            required: true
        },
        text:{
            type:String,
            required: true
        },
    },
    {timestamps:true}
) 
const Message =mongoose.model('message', roomSchema,'messages');
module.exports = Message;
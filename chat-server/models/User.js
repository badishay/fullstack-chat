const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const {isEmail} =require('validator');
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true,"Please enter a name"]
        },
        email:{
            type:String,
            required: [true,"Please enter a email"],
            unique:true,
            lowercase:true,
            validate:[isEmail, "Please enter a valid emaill address"]
        },
        password:{
            type:String,
            required: [true,"Please enter a password"],
            minlength:[6,"The password should be at least 6 charcters long"]
        }
    }
) 
//mongoose hook
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('before saving',this)
    next()
})
userSchema.statics.login = async function(email, password){
   const user= await this.findOne({email})
        if(user){
            console.log(user)
            const isAuthenticated = await bcrypt.compare( password,user.password)
            console.log(isAuthenticated)
            if (isAuthenticated){
                    return user;
                  }
                else{
                    throw new Error('incorrect password')
                  }
              }
        throw new Error('incorrect email')
    
}
   


const User =mongoose.model('user', userSchema);
module.exports = User;
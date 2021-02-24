const User =require('../models/User')
const jwt = require('jsonwebtoken');
const MAX_AGE = 5*24*60*60;
const createJWT = id =>{
    return jwt.sign({id},'chatroom secret key',
       {expiresIn: MAX_AGE } // expires in 5 days (expiresIn is by seconds)
       );
} 
const alertError = (err)=>{
    let errors = {name:"", email:"", password:""};
    console.log('err.message:',err.message)
    if(err.message==='incorrect password'){
        errors.password = 'incorrect password'
    }
    if(err.message==='incorrect email'){
        errors.email = 'incorrect email'
    }
    // console.log('err.code', err.code)
    if(err.code===11000){
        errors.email = 'This email already exist' 
        return (errors)
    }
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return (errors)

}
module.exports.signup = async (req,res)=>{
    const {name,email,password} = req.body
    try {
        //User.create method replace new User + user.save()
        const user = await User.create({name,email,password});
        const token = createJWT(user._id);
        console.log(token)
        res.cookie('jwt',token,{httpOnly:true,maxAge:MAX_AGE*1000})//maxAge is by milliseconds
        res.status(201).json({user});
    } catch (error) {
        let errors= alertError(error)
        res.status(400).json({errors})

      //res.status(400).send('Fail to create user')  
    }

    // console.log(req.body);
}
module.exports.login = async (req,res)=>{
    const {email, password} = req.body;
    try {
        //User.create method replace new User + user.save()
        const user = await User.login(email,password);
        const token = createJWT(user._id);
        console.log(token)
        res.cookie('jwt',token,{httpOnly:true,maxAge:MAX_AGE*1000})//maxAge is by milliseconds
        res.status(201).json({user});
    } catch (error) {
        let errors= alertError(error)
        res.status(400).json({errors})

      //res.status(400).send('Fail to create user')  
    }
}
module.exports.logout = (req,res)=>{
    res.cookie('jwt','',{httpOnly:true,maxAge:1})//maxAge is by milliseconds
    res.send ('logout')
}
//verify user cookies
module.exports.verifyUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'chatroom secret key', async(err,decodedToken)=>{
            console.log('decodedToken',decodedToken)
            if(err){
                console.log(err.message)
            }
            else{
                const user =await User.findById(decodedToken.id)
                console.log(user)
                res.json(user)
                next()
            }
        })
    }
    else{
        next()
    }
}
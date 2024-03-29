const express = require('express')
const bcrypt = require('bcrypt')
const UserModel  = require('../models/User')
const jwt = require('jsonwebtoken')

const router = express.Router()


//>>>>>>>>>>>User Registeration <<<<<<<<<<<<<<<

router.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    const user = await UserModel.findOne({username})
    if(user){
        console.log("user exists")
        return res.json({message:"user already exist"})
    }
    const hashpassword = await bcrypt.hash(password,10)
    const newuser = new UserModel({
        username,
        password:hashpassword
    })
    await newuser.save()
    return res.json({message:"record started"})
})


//>>>>>>>>>>> User Login with jwt Token <<<<<<<<<<<<<<<

router.post('/login',async (req,res)=>{
    const {username,password}=req.body
    const user = await UserModel.findOne({username})
    if(!user){
        res.json({message:"wrong credentials"})
    }
    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword){
        return res.json({message: "Invalid Password!"});
    }
    const token = jwt.sign({id:user._id},"secret123");
    res.cookie('token',token)
    return res.json({message:"successfully login",id: user._id})
    
})

module.exports = router
const express = require("express");
const {UserModel} = require("../models/user.model");
const bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken") 
const userRouter = express.Router()
require("dotenv").config()

userRouter.post("/signup",async(req,res)=>{
    const {name,email,password,avatar} = req.body;
    try {
            bcrypt.hash(password,3,async(error,hash)=>{
                if(hash){
                    const newUser = new UserModel({name,email,password:hash,avatar})
                    await newUser.save()
                    res.status(200).json({msg:"User registered successfully!"})
                }
                else{
                    res.send(200).json({error})
                }
            })
    
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password} =req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user)
        {
            bcrypt.compare(password,user.password,async (err,result)=>{
                if(result)
                {
                    var token = jwt.sign({userID:user._id},process.env.SECRET_KEY)
                    res.status(200).json({msg:"User successfully logged in",token,user:user._id})
                }
                else
                {
                    res.status(501).json("Invalid password")
                }
            })
        }
        else{
            res.status(400).json({"Error":"Email not found"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports = {userRouter}
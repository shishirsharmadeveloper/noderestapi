const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const PRIVATE_KEY=process.env.PRIVATE_KEY;


const signUp=async(req,res)=>{
    const {username,email,password}=req.body;
    const hashpassword = bcrypt.hashSync(password,10);
    const existUser = await userModel.findOne({email:email});
    if(existUser){
        res.status(400).json({message:'Email already exist'});  
    }
    else{
    try{
    await userModel.create({
        username:username,
        email:email,
        password:hashpassword
    });
    const token=jwt.sign({username:username,email:email},PRIVATE_KEY);
    const userobj={username:username,email:email};
    res.status(200).json({userobj:userobj,token:token,status:201,message:'Record added'});
    }
    catch(err){
    res.status(400).json({message:'Record not added'});  
    }
    }
}

const signIn=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existUser = await userModel.findOne({email:email});
        if(existUser){
                const matchpassword = await bcrypt.compare(password,existUser.password)
                if(matchpassword)
                {
                    const token=jwt.sign({username:existUser.username,email:existUser.email},PRIVATE_KEY);
                    res.status(400).json({username:existUser.username,email:existUser.email,token:token,message:'success'});
                }
                else
                {
                    res.status(400).json({message:'Wrong password'});
                }
        }   
        else{
            res.status(400).json({message:'User not found'});
        }

    }
    catch(err){

    }
}

module.exports={signUp,signIn};
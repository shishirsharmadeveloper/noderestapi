const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const PRIVATE_KEY=process.env.PRIVATE_KEY;

const addBlog=(req,res)=>{
    const {title,description}=req.body;
    const filename = req.file.filename;
    const obj={
        title:title,
        description:description,
        photo:filename
    }
    try{
        const blog = new blogModel(obj);
        blog.save();
        res.status(200).json({message:"Add Blog",blog:blog});
    }
    catch(err){
        res.status(200).json({message:"Error"});
    }
    
    
}

const getBlog=async(req,res)=>{
    try{
        const getData= await blogModel.find();
        if(!getData)
            {
                return res.status(400).json({message:"No Blog Found"});
            }
            else
            {
                return res.status(200).json({message:"get Blog",getData:getData});
            }

    }
    catch(err){
           return res.status(401).json({message:"Error"});
    }
    
}

const getSuper=async(req,res)=>{
    try{
        const getData= await userModel.aggregate([
            {
                $lookup:{
                    from:"blogs",
                    localField:"_id",
                    foreignField:"userId",
                    as:"Blogs"
                }
            },
            { $match : { email : "honey@gmail.com" } }
        ]);
        if(!getData)
            {
                return res.status(400).json({message:"No Blog Found"});
            }
            else
            {
                return res.status(200).json({message:"get Blog",getData:getData});
            }

    }
    catch(err){
           return res.status(401).json({message:"Error"});
    }
    
}

const getSingleBlog=async(req,res)=>{
    try{
        const id=req.params.id;
        const getData= await blogModel.find({_id:id});
        if(!getData)
            {
                return res.status(400).json({message:"No Blog Found"});
            }
            else
            {
                return res.status(200).json({message:"get Blog",getData:getData});
            }

    }
    catch(err){
           return res.status(401).json({message:"Error"});
    }
}

const deleteBlog=async(req,res)=>{
    const id = req.params.id;

    try{
      const deletedBlog = await blogModel.findByIdAndDelete(id);
      return res.status(200).json({message:"Blog Deleted",status:200,deletedBlog:deletedBlog})
    }
    catch(err){
      return res.status(400).json({message:"delete Blog",status:400});
    }
    
}

const updateBlog=async(req,res)=>{
    const {title,description}=req.body;
    const id = req.params.id;

    const obj={
        title:title,
        description:description
    }

    

    if(req.file !== undefined){
        obj.photo = req.file.filename;
        const getFileData = await blogModel.find({_id:id})
        await fs.unlink('uploads/'+getFileData[0].photo,(err)=>{
                console.log(err);
        })
    }

    console.log(obj);
    try{
        const UpdateNewBlog = await blogModel.findByIdAndUpdate(id,obj);
        res.status(200).json({message:"Update Blog",blog:UpdateNewBlog});
    }
    catch(err){
        res.status(200).json({message:"Error"});
    }
}

module.exports={addBlog,getBlog,getSingleBlog,deleteBlog,updateBlog,getSuper}
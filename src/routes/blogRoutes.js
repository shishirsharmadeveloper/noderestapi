const express = require('express');
const route = express.Router();
const {addBlog,getBlog,getSingleBlog,deleteBlog,updateBlog,getSuper} = require('../controllers/blogControllers');
const {auth} =require('../middlewares/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
});

const upload = multer({storage});

route.post('/add',upload.single('photo'),auth,addBlog);
route.get('/getAll',auth,getBlog);
route.get('/getSuper',auth,getSuper);
route.get('/getSingle/:id',auth,getSingleBlog);
route.delete('/delete/:id',auth,deleteBlog);
route.put('/update/:id',upload.single('photo'),auth,updateBlog);

module.exports=route;
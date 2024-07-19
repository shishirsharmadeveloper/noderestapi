const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const PRIVATE_KEY=process.env.PRIVATE_KEY;

const auth=(req,res,next)=>{
   const token=req.headers.authorization;
   if(!token){
    return res.status(401).json({status:401,message:"No Token found"});
   }
   else{
    try{
       const decode=jwt.verify(token,PRIVATE_KEY);
       req.user=decode;
       next();
    }
    catch(err){
        return res.status(401).json({status:401,message:"Invalid Token"});
    }

   }
}

module.exports={auth};
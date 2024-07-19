const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DBURL = process.env.DBURL;

const database = async()=>{
    try{
        await mongoose.connect(DBURL);
        console.log('database connected');
    }
    catch(err){
        console.log('database not connected');
    }

}

module.exports=database;
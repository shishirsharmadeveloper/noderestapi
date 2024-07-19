const express = require('express');
const app=express();
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require('dotenv');
const database = require('../src/config/db.config');



dotenv.config();
database();

app.use(express.json());
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/blogs',blogRoutes);

module.exports=app;

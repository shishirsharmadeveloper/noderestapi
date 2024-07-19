const express = require('express');
const route = express.Router();
const {signUp,signIn} = require('../controllers/userControllers');

route.post('/signup',signUp)
route.post('/signin',signIn)

module.exports=route;
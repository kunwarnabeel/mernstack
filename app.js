const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

dotenv.config({path:'./config.env'});

const DB = process.env.DB;

mongoose.connect(DB , {useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology:true,
useFindAndModify:false}).then( () => {
    console.log("database connected");
}).catch( (err) => {
    console.error(err);
});

//Middleware

const middleware = (req, res, next) => {
    console.log("I am middleware");
    next();
}

app.get('/' , (req,res) => {
    res.send("Homepage");
});

app.get('/about' , middleware, (req,res) => {
    res.send("about");
});

app.get('/contact' , (req,res) => {
    res.send("contact");
});

app.get('/signin' , (req,res) => {
    res.send("signin");
});

app.get('/signup' , (req,res) => {
    res.send("signup");
});

app.listen(3000 , ()=> {
    console.log("server is running at port 3000");
});
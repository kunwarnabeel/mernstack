const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config({path:'./config.env'});
const Port = process.env.PORT;

require('./db/conn');
//const userModel = require('./model/userschema');

// link routes using middleware 
app.use(express.json());
app.use(require('./router/auth'));
// end 

// Middleware
const middleware = (req, res, next) => {
    console.log("I am middleware");
    next();
}
// end

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

app.listen(Port , ()=> {
    console.log(`server is running at port ${Port}`);
});
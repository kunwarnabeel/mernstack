const express = require('express');
const router = express.Router();

require('../db/conn');
const userModel = require('../model/userschema');

router.get('/' , (req,res) => {
    res.send("Homepage from router");
});

// using promises
// router.post('/register', (req,res) =>{
//     const {name , email , phone , password , cpassword} = req.body;
//     if(!name || !email || !phone || !password || !cpassword){
//         return res.status(422).json({error:"Please fill all fields correctly"});
//     }
//     userModel.findOne({email:email}).then( (userExsist)=>{
//         if(userExsist){
//             return res.status(422).json({message:"Email Already exsist"});
//         }
//         const user = new userModel({name , email , phone , password , cpassword});
//         user.save().then(()=>{
//             return res.status(201).json({message:"Registered Successfully"})
//         }).catch((err)=>{
//             return res.status(500).json({error:"Failed to register"})
//         })
//     }).catch( (err) =>{
//         console.log(err);
//     });
// });

// using async await 
try{
    router.post('/register', async (req,res) =>{
        const {name , email , phone , password , cpassword} = req.body;
        if(!name || !email || !phone || !password || !cpassword){
            return res.status(422).json({error:"Please fill all fields correctly"});
        }
        const userExsist = await userModel.find({email:email});
        if(userExsist){
            return res.status(422).json({message:"Email Already exsist"});
        }
        const user = new userModel({name , email , phone , password , cpassword});
        await user.save();
        return res.status(200).json({message:"Registered Successfully"});
    });
}
catch(err){
    console.log(err);
}

module.exports = router;
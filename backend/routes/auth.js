import express from "express"
import User from "../models/User.js"
const router = express.Router(); // handle req
import { body,validationResult } from "express-validator"; // for validate of db entires not same email for two or more  
import bcrypt from "bcryptjs"; // for password hashing
import jwt from 'jsonwebtoken' // token method to hashing

import fetchUser from "../middleware/fetchUser.js"; // for middleware used in 127 line

const JWT_SECRET = "NeelBiswas"

// create user using post"/api/auth/createuser" doesnt require auth(login)  


    router.post("/createuser",[
        body('email',"enter a valid email").isEmail(),
        body('name',"enter a valid name").isLength({min : 3}),
        body('password',"enter a valid password").isLength({min : 5}),

    ], async (req,res)=>{

 //if error return bad req and error   
    console.log(req.body);
    // const user = User(req.body)
    // user.save();
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors : result.array()});
    }
//check if user exist with same email
    try{
        let user = await User.findOne({email : req.body.email});
        
        if(user){
            return res.status(400).json({error : "Email already exists"})
        }

//password hashing
        const salt = await bcrypt.genSalt(10); 
        const setPass = await bcrypt.hash(String(req.body.password), salt);

        console.log("hasing value",setPass); //return hash value

//create new user
        user = await User.create({
            name: req.body.name,
            password: setPass,
            email: req.body.email,
        })
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        //     res.json({error : "please enter a different email ", message : err.message})
 
        
//token based hashing        
        const data= {
            user: {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        // console.log("token value ",authToken); //return tokens
        res.json({authToken})
        
        // res.json({user}) 

//error for server side error 
    }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server error occured")
    
    }


});




    
// authentiate existing user using post"/api/auth/login" doesnt require auth(login)  
    router.post("/login",[
        body('email',"enter a valid email").isEmail(),
        body('password',"Password cannot be blank").exists(),

    ], async (req,res)=>{
 

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({errors : result.array()});
        }

        const {email,password}= req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "Wrong Credentials entered, No user found"}) // if no user found in db or wrong email entered
            }
            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({error: "Wrong Credentials entered , Wrong Password"}) // if wrong password entered
            }
    // if everything is correct runs this 
            const data = {
                
                    user: {
                        id : user.id
                    }
                }
            const authToken = jwt.sign(data,JWT_SECRET);
            res.json({authToken});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Error occured")
        }
    });

        
        
        
        
// fetch logged in user detail using post"/api/auth/getuser"  require auth(login)
        router.post("/getuser",fetchUser, async (req,res)=>{
     
        try{
            const userId= req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
        }catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Error occuredererrer")
        }
        
        
        
        
    });
    
    
    // res.send(req.body)
    // res.send("Hello from auth");
    
//  module.exports = router
export default router;
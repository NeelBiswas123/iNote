import express from "express"
import User from "../models/User.js"
const router = express.Router();
import { body, query,validationResult } from "express-validator";


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
//create new user
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        //     res.json({error : "please enter a different email ", message : err.message})
          
        res.json({user})  
 }catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
    
    }
        });

    


    // res.send(req.body)
    // res.send("Hello from auth");






//  module.exports = router
export default router;
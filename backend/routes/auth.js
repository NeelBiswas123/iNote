import express from "express"
import User from "../models/User.js"
const router = express.Router();
import { body, query,validationResult } from "express-validator";


// create user using post"/api/auth" doesnt require auth  




router.post("/",[
    body('email',"enter a valid email").isEmail(),
    body('name',"enter a valid name").isLength({min : 3}),
    body('password',"enter a valid password").isLength({min : 5}),

], (req,res)=>{

    
    console.log(req.body);
    // const user = User(req.body)
    // user.save();
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors : result.array()});
    }
//it returs promise
        User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        .then(user => res.json(user))
        .catch(err => {console.log(err)
            res.json({error : "please enter a different name ", message : err.message})
        });

    


    // res.send(req.body)
    // res.send("Hello from auth");
});





//  module.exports = router
export default router;
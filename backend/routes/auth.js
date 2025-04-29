import express from "express"
import User from "../models/User.js"
const router = express.Router();


// create user using post"/api/auth" doesnt require auth  




router.post("/",(req,res)=>{

    
    console.log(req.body);
    const user = User(req.body)
    user.save();

    // res.send(req.body)
    res.send("Hello from auth");
});





//  module.exports = router
export default router;
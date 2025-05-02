// #middleware use when  login user is get req by calling 

// fetchUser used in line 125 auth.js as middleware

import jwt from 'jsonwebtoken'
const JWT_SECRET = "NeelBiswas"


const fetchUser = (req,res,next)=>{
    
//get user from jwt token and add id to req object
    const token = req.header("auth-token") //req token from header 
    if(!token){
        res.send(401).send({error : "Access Denied , please authenticate with valid token"});
    }

    try{
    const data = jwt.verify(token,JWT_SECRET);
    req.user= data.user
    next();
    }catch{   // if token is not valid
        res.status(401).send({error : "Please authenticate to valid token"})
    }
}

export default fetchUser;
import express from "express"

const router = express.Router();

router.get("/",(req,res)=>{
    console.log(req.body);
    
    res.send("Hello from auth");
});
//  module.exports = router
export default router;
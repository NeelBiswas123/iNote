import express from "express"
import Note from "../models/Note.js"
import fetchUser from "../middleware/fetchUser.js";
import { body,validationResult } from "express-validator"; // for validate of db entires not empty here notes not empty   

const router = express.Router();


// fetch to get all the notes using get"/api/auth/fetchallnotes" doesnt require auth(login)
    router.get("/fetchallnotes",fetchUser, async (req,res)=>{
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    // res.json([]);
    });

//add a new note using post "/api/auth/addnote" auth required
    router.post("/addnote",fetchUser,[
        body('title',"enter the Title").isLength({min : 3}),
        body('description',"Enter the Description(atlease 10 chracters)").isLength({min : 10}),

    ], async (req,res)=>{

        try{
        const {title,description,tag}= req.body;

     //if error return bad req and error   
         const result = validationResult(req);
         if (!result.isEmpty()) {
             return res.status(400).json({errors : result.array()});
         }
    
         const note = new Note({
                title,description,tag, user: req.user.id
         });
         const savedNote = await note.save();
        res.json(savedNote);

        } catch(error){
            console.error( error.message);
            res.status(500).send("Internal server error");
        }
    
    });

export default router;
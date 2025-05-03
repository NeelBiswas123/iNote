import express from "express"
import Note from "../models/Note.js"
import fetchUser from "../middleware/fetchUser.js";
import { body,validationResult } from "express-validator"; // for validate of db entires not empty here notes not empty   

const router = express.Router();


// Route-1 fetch to get all the notes using get"/api/notes/fetchallnotes" doesnt require auth(login) (Read in CRUD)
    router.get("/fetchallnotes",fetchUser, async (req,res)=>{
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    // res.json([]);
    });




//Route-2 : add a new note using post "/api/notes/addnote" auth required(CREATE in CRUD)
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




//Route-3 Update in Crud in put "/api/notes/updatenote" 
    router.put("/updatenote/:id",fetchUser, async (req,res)=>{
        const {title,description,tag}=req.body;

        try{
        //create new Note obj
        const newNote ={
        }

        if(title){newNote.title= title};
        if(description) {newNote.description= description};
        if(tag) {newNote.tag= tag};


        // find the note to be updated 
        let note = await Note.findById(req.params.id)
        if(!note) {return res.status(404).send("Not found")}; // if note not found to update

        //to check that real person is creating this update not unauthorized
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Unauthorized access")
        }


        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote} , {new : true})
        res.json(note)
    }catch(error){
        console.log(error.message);
        
        res.status(500).send("Internal server error")
    }


    });





//Route-4 delete exisiting note in Crud in put "/api/notes/deletenote" 
    router.delete("/deletenote/:id",fetchUser, async (req,res)=>{

    try{
        


        // find the note to be deleted by id
        let note = await Note.findById(req.params.id)
        if(!note) {return res.status(404).send("Not found")}; // if note not found to be deleted or auth token is wrong

        //allow deletion if user owns this note
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Unauthorized access") // bad person tries to delete it
        }


        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted", note: note})
    }
    catch(error){
        console.log(error.message);
        
        res.status(500).send("Internal server error")
    }

    

    });
export default router;
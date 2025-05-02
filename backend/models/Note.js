import mongoose from "mongoose";
const { Schema } = mongoose;
import { body, query,validationResult } from "express-validator"; // for validate of db entires that empty file notes cant be stored


const notesSchema = new Schema({
    user: {type : mongoose.Schema.Types.ObjectId,ref:"user"}, //storing userid here (like foreign key)
    
    title : {type : String, required : true},
    description : {type : String, required : true},
    tag : {type : String},
    
    date : {type : Date, default : Date.now},
    
  });
    // module.exports =  mongoose.model("notes",notesSchema)
export default mongoose.model("note", notesSchema);

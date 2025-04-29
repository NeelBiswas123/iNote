// import { type } from "@testing-library/user-event/dist/type";
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true,unique : true},
    password : {type : String, required : true},
    date : {type : Date, default : Date.now},
    
  });
  // module.exports =  mongoose.model("user",usersSchema)
  export default mongoose.model("User", usersSchema); 
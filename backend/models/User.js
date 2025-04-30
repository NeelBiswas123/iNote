// import { type } from "@testing-library/user-event/dist/type";
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },              
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("user", usersSchema); 
  // module.exports =  mongoose.model("user",usersSchema)
  User.createIndexes()
  export default User
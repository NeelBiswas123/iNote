// const mongoose = require('mongoose')
// const mongoURI = "mongodb://localhost:27017/"


// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected to mongo successfully");
        
//     })
// }

// module.exports=connectToMongo;


// the prev doesnot work call mongo doesnot support call back to new version 

// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/";

// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true
//         });
//         console.log("Connected to Mongo successfully");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };

// module.exports = connectToMongo;






// this is es6 version of prev method 
import mongoose from "mongoose";
const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("Connected to Mongo successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};


export default connectToMongo

// const connectToMongo = require("./db")

import connectToMongo from "./db.js";
connectToMongo();
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

import express from "express" 
const app = express()
const port = 5000

//request to json from postman
app.use(express.json())

// const cors = require("cors");
import cors from 'cors';
app.use(cors()); // Allow all origins


//avilable routes
  // app.use("/api/auth",require("./routes/auth.js")) //not work for es module
  // app.use("/api/notes",require("./routes/notes.js"))

//for redirect to auth (access this localhost:5000/api/auth/(createuser it's in auth.js))
  app.use('/api/auth', authRoutes);
  app.use('/api/notes', notesRoutes);

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`iNote Backend listening on port ${port}`)
})


import { useState } from "react";
import noteContext from "./NoteContext";


const NoteState=(props)=>{
    const notesInitial= [
        {
          "_id": "68143f96eeerd970b4d8aa4fcb5e",
          "user": "6812e10b0171cf641f9e364b",
          "title": "My First Program",
          "description": "THis is my first program from lesson harry mongodb playlist video 52",
          "tag": "Mongodb, Harry, video 52",
          "date": "2025-05-02T03:44:22.012Z",
          "__v": 0
        },
        {
          "_id": "68143f964e1d970b4d8aa4fcb60",
          "user": "6812e10b0171cf641f9e364b",
          "title": "My First Program",
          "description": "THis is my first program from lesson harry mongodb playlist video 52",
          "tag": "Mongodb, Harry, video 52",
          "date": "2025-05-02T03:44:22.531Z",
          "__v": 0
        },
        {
          "_id": "68143f96d55970b4d8aa4fcb61",
          "user": "6812e10b0171cf641f9e364b",
          "title": "My Duplicate 1",
          "description": "THis is my first duplicate note",
          "tag": "Mongodb, Harry, video 52",
          "date": "2025-05-02T03:44:22.531Z",
          "__v": 0
        },
        {
          "_id": "68143f96d334970b4d8aa4fcb62",
          "user": "6812e10b0171cf641f9e364b",
          "title": "My DDD2",
          "description": "THis is my #2 ddd Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet dolorem voluptas commodi blanditiis alias labore, corrupti doloremque sequi animi repudiandae libero sint!",
          "tag": "Mongodb, Harry, video 52",
          "date": "2025-05-02T03:44:22.531Z",
          "__v": 0
        },
        {
          "_id": "681576475e533397352bd1977c",
          "user": "6812e10b0171cf641f9e364b",
          "title": "The Update Test",
          "description": "THis my test to Update a note",
          "tag": "Mongodb, Harry, video 53",
          "date": "2025-05-03T01:49:59.206Z",
          "__v": 0
        }
      ]
    

      const [notes,setnotes] = useState(notesInitial)
    

    return (
        <noteContext.Provider value={{notes,setnotes}} >
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;
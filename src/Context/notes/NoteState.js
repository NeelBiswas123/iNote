
import { useState } from "react";
import noteContext from "./NoteContext";


const NoteState=(props)=>{
    const host = "http://localhost:5000"
    const notesInitial= []
    
    
      const [notes,setnotes] = useState(notesInitial)


//fetch all note 
          const getNotes = async (title,description,tag)=>{
            //api call 
            const url = `${host}/api/notes/fetchallnotes`
            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxMmUxMGIwMTcxY2Y2NDFmOWUzNjRiIn0sImlhdCI6MTc0NjE1MjQ0Mn0.B9nf3sDdSTgpBOlMScfXrXVOh95lZkMSsO5DBhOnHfs"

              },
              
            
            });
            const json = await response.json();
            // console.log(json);
            setnotes(json)

          }




    //add a note 
      const addNote = async (title,description,tag)=>{
        //api call 
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxMmUxMGIwMTcxY2Y2NDFmOWUzNjRiIn0sImlhdCI6MTc0NjE1MjQ0Mn0.B9nf3sDdSTgpBOlMScfXrXVOh95lZkMSsO5DBhOnHfs"

          },
          
          body: JSON.stringify({title,description,tag}),
        
        });
        // const json = response.json();



        //logic to add note
      const note = {
          "_id": "681576475e533397352bd1977c",
          "user": "6812e10b0171cf641f9e364b",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2025-05-03T01:49:59.206Z",
          "__v": 0
        };
        //use fetch api to call
        // setnotes= (notes.push(note)) //old method 
        setnotes([...notes, note]); // This correctly updates the state

      }
      




      //del a note 
      const delNote = async(id)=>{
        //api call
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxMmUxMGIwMTcxY2Y2NDFmOWUzNjRiIn0sImlhdCI6MTc0NjE1MjQ0Mn0.B9nf3sDdSTgpBOlMScfXrXVOh95lZkMSsO5DBhOnHfs"

          },  
          
        });
        const json = response.json();
        console.log(json);



        console.log("Del note from id "+ id);
      const newNotes = notes.filter((note =>{ return note._id !==id}))
        setnotes(newNotes)
        
      }
      
      




      //edit a note 
      const editNote = async (id,title,description,tag)=>{
        console.log("enter edit note section");
        
        //api call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxMmUxMGIwMTcxY2Y2NDFmOWUzNjRiIn0sImlhdCI6MTc0NjE1MjQ0Mn0.B9nf3sDdSTgpBOlMScfXrXVOh95lZkMSsO5DBhOnHfs"

          },
          
          body: JSON.stringify({title,description,tag}),
        
        });
        // const json = response.json();

        //logic to edit in clinet
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id ===id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
          
        }
      }

    return (
        <noteContext.Provider value={{notes,getNotes,addNote,delNote,editNote}} >
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;
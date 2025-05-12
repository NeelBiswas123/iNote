
import { useEffect, useState } from "react";
import noteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []


  const [notes, setnotes] = useState(notesInitial)


  //fetch all note 
        const getNotes = async (title, description, tag) => {
          //api call 
          try {
            const url = `${host}/api/notes/fetchallnotes`
            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

              },


            });
            if (!response.ok) {
              console.error("Error Fetching notes");
              return;
            }
            const json = await response.json();
            // console.log(json);
            if (JSON.stringify(notes) !== JSON.stringify(json)) {
              setnotes(json);
            }

          }
          catch (error) {
            console.error("Fetch failed: ", error)
          }
        };
        useEffect(()=>{
          // console.log("Fetching notes");
          
          getNotes();
        },[]);


  //add a note 
    const addNote = async (title, description, tag) => {
    //api call 
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag }),

    });
    // const json = response.json();
      if (!response.ok) {
          console.error("Failed to add note");
          return;
        }


    //logic to add note
    
    //use fetch api to call
    // setnotes= (notes.push(note)) //old method 
     const json = await response.json(); // actual note from backend
     setnotes([...notes, json]); 

  }





  //del a note 
  const delNote = async (id) => {
    //api call
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

    });

     if (!response.ok) {
      const errorText = await response.text(); // fallback if not JSON
      console.error("Failed to delete note:", errorText);
      return;
    }
    const json = response.json();
    console.log("delete response",json);



    console.log("Del note from id " + id);
    const newNotes = notes.filter((note => { return note._id !== id }))
    setnotes(newNotes)

  }






  //edit a note 
  const editNote = async (id, title, description, tag) => {
    console.log("enter edit note section");

    //api call
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag }),

    });
    // const json = response.json();

    // let make a new node cause the below methos can't let change state in react directly 
      let newNotes = JSON.parse(JSON.stringify(notes));

    //logic to edit in clinet
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    console.log(id,notes);
    
    setnotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes, getNotes, addNote, delNote, editNote }} >
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;
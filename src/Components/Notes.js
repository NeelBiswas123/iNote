import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes,getNotes} = context;
  // to fetch all the notes 
    useEffect(()=>{
        getNotes();
    },[notes])


  return (
    <>
      <AddNote />
      <div className='row my-3' >
        {notes.map((note) => {
          //   return note.title;
          return <NoteItem key={note._id} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes

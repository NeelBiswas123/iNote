import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  // to fetch all the notes 
  useEffect(() => {
    getNotes();
  }, []);


  //to edit  an existing note
      const ref = useRef(null);
      const refClose = useRef(null);

      const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: ""})
      const updateNote = (currentNote) => {
        // ref.current.click();
        if (ref.current) {
          ref.current.click();
          setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag: currentNote.tag});
        } else {
          console.log("Not workingfor ref");

        }
      }



    const handleClick = (e)=>{
      console.log("Updating the note",note);
      editNote(note.id,note.etitle,note.edescription,note.etag);
      if (refClose.current) {
        refClose.current.click();
        
      } else {
        console.log("Not working for refClose");

      }
       
        
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


  return (
    <>
      <AddNote />

      {/* add functionality to edit button   */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>
            <div className="modal-body">
            {/* add form inside the body of edit button  */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>




      <div className='row my-3' >
        {notes.map((note) => {
          //   return note.title;
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes

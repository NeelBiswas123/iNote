import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const navigate = useNavigate();
  // to fetch all the notes 
  useEffect(() => {
      // checks if user logged then acesss home else redirect to  login
    if(localStorage.getItem("token")===null){
         navigate("/login");
    }else{
    getNotes();
    }
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
        props.showAlert("Updated Successfully","success")
        
      } else {
        console.log("Not working for refClose");
        props.showAlert("Cannot update notes","danger")
      }
       
        
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


  return (
    <>
      <AddNote  showAlert={props.showAlert}/>

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
                  <input type="text" placeholder='Atleast 5 Characters required' className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input placeholder='Atleast 10 Characters required' type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={10} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input  type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length <5 || note.edescription.length < 10} type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>




      <div className='container row my-3 mx-3' >
        {notes.length === 0 && "No notes to display"}
        {notes.map((note) => {
          //   return note.title;
          return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
import React ,{useContext} from 'react'
import noteContext from "../Context/notes/NoteContext";
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {delNote} = context;

    const { note } = props;
    return (
        <div className='col-md-3 my-3' >
            {/* {note.title}
            {note.description} */}
            <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        {/* delete icon  */}
                        <i className="far fa-trash-alt mx-2" onClick={()=>{delNote(note._id)}} aria-hidden="true"></i> 
                        {/* edit icon  */}
                        <i className="far fa-edit mx-2" aria-hidden="true"></i>
                        
                    </div>
            </div>
        </div>
    )
}

export default NoteItem

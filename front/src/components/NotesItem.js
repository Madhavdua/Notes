import React, { useContext } from 'react'
import noteContext from '../context/Createcontext';

const NotesItem = (props) => {
    const {note,openModal}=props
    const c=useContext(noteContext);
    const {editNote, deleteNote}=c;
    const remove=()=>{
        deleteNote(note._id);
    }
    const update=()=>{
        openModal(note._id,note.title,note.description,note.comments);
    }
    return (
        <div>
            <div className="card my-2 mx-2" >
                <div className="card-body ">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                    <i className="fa-solid fa-pen-to-square mx-2" style={{cursor:"pointer"}} onClick={update}></i>
                    <i className="fa-solid fa-trash-can mx-2" style={{cursor:"pointer"}} onClick={remove}></i>
                </div>
            </div>
        </div>
    )
}

export default NotesItem
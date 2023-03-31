import React from 'react'
import { useState, useContext } from 'react'
import noteContext from '../context/Createcontext'
import Alert from './Alert';

const Addnote = () => {
  const c = useContext(noteContext);

  const [note, setNote] = useState({
    title: "",
    description: "",
    comments: ""
  })
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    c.addNote(note.title, note.description, note.comments)
  }

  return (
    <form className="container my-3">
      <div className="mb-3" >
        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
        <input type="text" className="form-control" placeholder='Enter a title of atleast 3 charachter' name='title' onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
        <input type="text" className="form-control" name='description' placeholder='Enter a description of atleast 5 charachter' onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label" >Comments</label>
        <input type="text" className="form-control" name='comments' placeholder='Write comments here' onChange={onChange}/>
      </div>
      <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default Addnote
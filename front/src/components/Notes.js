import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/Createcontext'
import NotesItem from './NotesItem'

const Notes = (props) => {
  const c = useContext(noteContext);

  const { notes,setNotes, fetchNotes,editNote } = c

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      fetchNotes()
    }
    // eslint-disable-next-line
  }, [])


  const [note, setNote] = useState({
    title: "",
    description: "",
    comments: ""
  })

  const ref = useRef(null);
  const openModal = (id,tit,des,com) => {
    ref.current.click();
    setNote({
      id:id,
      title:tit,
      description:des,
      comments:com
    })
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    c.editNote(note.id,note.title, note.description, note.comments)
    ref.current.click();
  }

  if (!notes || notes.length === 0) return <div className='container'><h5>No Notes Found</h5></div>
  return (
    <div className='container'>

      <h2>Your Notes</h2>
      {/* start modal */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="container my-3">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" placeholder='Enter a title of atleast 3 charachter' name='title' onChange={onChange} value={note.title}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
                  <input type="text" className="form-control" name='description' placeholder='Enter a description of atleast 5 charachter' onChange={onChange} value={note.description}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Comments</label>
                  <input type="text" className="form-control" name='comments' placeholder='Write comments here' onChange={onChange} value={note.comments}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {/* end modal */}

      {notes.map((note) => {
        return <div key={note._id} className="d-inline-flex flex-wrap"> <NotesItem note={note} openModal={openModal} /></div>
      })}
    </div>
  )
}

export default Notes
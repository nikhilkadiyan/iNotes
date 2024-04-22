import React, { useContext,useState, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { notes, getAllNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes();
        }else{
            navigate('/login');
        }
        //eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({id:'', etitle: '', edescription: '', etag: '' });

    const handleClick = (e) => {
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note updated successfully","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id,etitle: currentNote.title,edescription: currentNote.description, etag: currentNote.tag});
    }

    const ref = useRef(null);
    const refClose = useRef(null);
    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <button style={{display:'none'}} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={!(note.etitle.length >=5 && note.edescription.length>=5)} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </div>
    )
}

export default Notes

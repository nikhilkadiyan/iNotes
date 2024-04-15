import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import EditNote from './EditNote';

function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const [editNoteVisible, setEditNoteVisibility] = useState(false);

    const updateVisibility = (val)=>{
        setEditNoteVisibility(val);
    }

    const { note } = props;

    return (
        <>
            {editNoteVisible && <EditNote id={note._id} updateVisibility={updateVisibility} title={note.title} description={note.description} tag={note.tag} />}
            <div className='col-lg-4 col-md-6 my-2'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }} ></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateVisibility(true)}}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem

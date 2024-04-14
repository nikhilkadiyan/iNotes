import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'

function Notes() {
    const context = useContext(noteContext);
    const { notes, getAllNotes } = context;
    useEffect(()=>{
        getAllNotes();   
    },[])
    return (
        <div>
            <AddNote/>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes

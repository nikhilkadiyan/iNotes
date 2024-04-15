import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function EditNote(props) {
    const context = useContext(noteContext);
    const { editNote } = context;

    const [note, setNote] = useState({ title: props.title, description: props.description, tag: props.tag });

    const handleClick = (e) => {
        e.preventDefault();
        editNote(props.id, note.title, note.description, note.tag);
        props.updateVisibility(false);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ width: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: 'white' }}>
            <div className="container my-3" style={{
                height: '100%',
                minHeight: '100%',
                minWidth: '100%',
                width: '100%',
                border: 'solid 1px black',
                borderRadius: '5px',
            }}>
                <h2>Edit Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>
                    <button onClick={handleClick} type="submit" className="btn btn-primary">Update Note</button>
                </form>
            </div>
        </div>
    )
}

export default EditNote

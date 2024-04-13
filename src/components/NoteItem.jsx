import React from 'react'

function NoteItem(props) {

    const { note } = props;

    return (
        <div className='col-lg-4 col-md-6 my-2'>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem

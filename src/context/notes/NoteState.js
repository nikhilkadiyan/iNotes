import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getAllNotes = async()=>{
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMzcwYzNjODNmYWNlY2YyYWQxZmQzIn0sImlhdCI6MTcxMjU1MTQ5OH0.xlLjFJHqfyh-czM3v6sxd5666mExBS6FL6YMOmJz5vI"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  //Add a note
  const addNote = async(title, description, tag) => {

    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMzcwYzNjODNmYWNlY2YyYWQxZmQzIn0sImlhdCI6MTcxMjU1MTQ5OH0.xlLjFJHqfyh-czM3v6sxd5666mExBS6FL6YMOmJz5vI"
      },
      body: JSON.stringify({title,description,tag}),
    });
    
    const note = await response.json();
    setNotes(notes.concat(note));
  }
  //Delete a note
  const deleteNote = async(id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMzcwYzNjODNmYWNlY2YyYWQxZmQzIn0sImlhdCI6MTcxMjU1MTQ5OH0.xlLjFJHqfyh-czM3v6sxd5666mExBS6FL6YMOmJz5vI"
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("Deleting the note with id:" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMzcwYzNjODNmYWNlY2YyYWQxZmQzIn0sImlhdCI6MTcxMjU1MTQ5OH0.xlLjFJHqfyh-czM3v6sxd5666mExBS6FL6YMOmJz5vI"
      },
      body: JSON.stringify({title,description,tag}),
    });
    const updatedNote = await response.json();
    console.log(updatedNote);
    //Logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes,getAllNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;
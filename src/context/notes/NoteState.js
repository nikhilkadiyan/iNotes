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
    
    const note = {
      "_id": "66152105ndh8850ba0ad4",
      "user": "661370c3c83facecf2ad1fd3",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-04-09T11:06:43.713Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //Delete a note
  const deleteNote = (id) => {
    //To do API call
    console.log("Deleting the note with id:" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMzcwYzNjODNmYWNlY2YyYWQxZmQzIn0sImlhdCI6MTcxMjU1MTQ5OH0.xlLjFJHqfyh-czM3v6sxd5666mExBS6FL6YMOmJz5vI"
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();

    //Logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
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
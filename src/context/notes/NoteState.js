import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "66152143057e8ea850ba0ad4",
          "user": "661370c3c83facecf2ad1fd3",
          "title": "My Title",
          "description": "Please wake up early.",
          "tag": "personal",
          "date": "2024-04-09T11:06:43.713Z",
          "__v": 0
        },
        {
          "_id": "66152143057e8ea850ba0ad4",
          "user": "661370c3c83facecf2ad1fd3",
          "title": "My Title 2",
          "description": "Please wake up early 2.",
          "tag": "personal",
          "date": "2024-04-09T11:06:43.713Z",
          "__v": 0
        },
        {
          "_id": "66152143057e8ea850ba0ad4",
          "user": "661370c3c83facecf2ad1fd3",
          "title": "My Title",
          "description": "Please wake up early.",
          "tag": "personal",
          "date": "2024-04-09T11:06:43.713Z",
          "__v": 0
        },
        {
          "_id": "66152143057e8ea850ba0ad4",
          "user": "661370c3c83facecf2ad1fd3",
          "title": "My Title 2",
          "description": "Please wake up early 2.",
          "tag": "personal",
          "date": "2024-04-09T11:06:43.713Z",
          "__v": 0
        },
        {
          "_id": "66152143057e8ea850ba0ad4",
          "user": "661370c3c83facecf2ad1fd3",
          "title": "My Title",
          "description": "Please wake up early.",
          "tag": "personal",
          "date": "2024-04-09T11:06:43.713Z",
          "__v": 0
        },
        {
          "_id": "66152143057e8ea850ba0ad4",
          "user": "661370c3c83facecf2ad1fd3",
          "title": "My Title 2",
          "description": "Please wake up early 2.",
          "tag": "personal",
          "date": "2024-04-09T11:06:43.713Z",
          "__v": 0
        }
      ]

      const [notes, setNotes]=useState(notesInitial);

    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
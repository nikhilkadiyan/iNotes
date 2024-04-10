const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

const router = express.Router();

//Route 1 : Get the notes using GET "/api/notes/fetchallnotes". Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

})

//Route 2 : Add a new notes using POST "/api/notes/addnote". Login required.
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'Description should be atleast 5 character').isLength({ min: 5 })
], async (req, res) => {

    const { title, description, tag } = req.body;
    //If there are errors return bad request and the errors.
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})


//Route 3 : Update a note using PUT "/api/notes/updatenote/:id". Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        //if note is not available
        if (!note) { return res.status(404).send("Not found.") }
        //Check if the note belong to the same user.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed.")
        }
        //find and update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

//Route 4 : Delete a note using DELETE "/api/notes/deleltenote/:id". Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        //if note is not available
        if (!note) { return res.status(404).send("Not found.") }
        //Check if the note belong to the same user.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed.")
        }
        //find and update the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been successfully deleted." });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})



module.exports = router;
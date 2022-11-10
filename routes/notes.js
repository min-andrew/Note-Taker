const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET route for retrieving all the notes 
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for submitting notes 
notes.post('/', (req, res) => {
    // destructuring assignment for the items in req.body
    const { title, text } = req.body;
    // if all the required properties are present 
    if (title && text) {
        // variable for the object we will save 
        const newNote = {
            title,
            text,
            id: uuid(),
        }

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);

    } else {
        res.json('Error in posting note');
    }
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);

            // Save that array to the filesystem
            writeToFile('./db/db.json', result);

            // Respond to the DELETE request
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

module.exports = notes
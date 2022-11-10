const express = require('express');
const path = require('path');
const api = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api)

app.use(express.static('public'));

// get route for index 
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html')));

// get route for notes 
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html')),
);

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
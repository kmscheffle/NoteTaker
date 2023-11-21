

const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const fs= require('fs')
const { v4: uuidv4 } = require('uuid');


const PORT = process.env.PORT || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('/api/notes', (req, res) => {
    const savednotes = db
    res.json(savednotes)
});

app.post('/api/notes', (req, res) => {
    const savednotes = db
    const newnote = {
        title:req.body.title,
        text:req.body.text,
        id:uuidv4()
    }
    savednotes.push(newnote)
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(savednotes))
    res.json(savednotes)
});

app.delete('/api/notes/:id', (req, res) => {
    const noteid = req.params.id
    const savednotes = db
    for (let index = 0; index < savednotes.length; index++) {
        if(noteid===savednotes[index].id){
            savednotes.splice(index,1)
        }
        
    }
    
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(savednotes))
    res.json(savednotes)
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
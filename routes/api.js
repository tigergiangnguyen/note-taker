const fs = require('fs');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// GET route returns a JSON list of notes 
router.get('/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(dbJson);
});

// Post Route for sumbitting notes written by the user
router.post('/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
  
    // Variable for the object we will save
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text
    };
  
    dbJson.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
    res.json(dbJson);
});

// DELETE Route for a specific note
router.delete('/notes/:id', (req, res) => {
  let newData = fs.readFileSync('db/db.json', 'utf8');

  const dataJson =  JSON.parse(newData);

  // Make a new array of all tips except the one 
  //with the ID provided in the URL
  const newNotes = dataJson.filter((note) => { 
    return note.id !== req.params.id;
  });

  // Save that array to the filesystem
  fs.writeFileSync('db/db.json',JSON.stringify(newNotes));

  // Respond to the DELETE request
  res.json('Successfully deleted note');
});

module.exports = router;
const fs = require('fs');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.get('/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(dbJson);
});

router.post('/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
  
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text
    };
  
    dbJson.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
    res.json(dbJson);
});

router.delete('/notes/:id', (req, res) => {
  let newData = fs.readFileSync('db/db.json', 'utf8');

  const dataJson =  JSON.parse(newData);

  const newNotes = dataJson.filter((note) => { 
    return note.id !== req.params.id;
  });

  fs.writeFileSync('db/db.json',JSON.stringify(newNotes));
  res.json('Successfully deleted note');
});

module.exports = router;
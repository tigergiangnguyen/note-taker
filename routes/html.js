const router = require('express').Router();
const path = require('path');

// GET Route for homepage
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

// GET Route for notes page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// Wildcard Route to direct users to homepage
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;
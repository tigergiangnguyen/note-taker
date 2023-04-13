const express = require('express');
const PORT = process.env.PORT || 3001;

// Import our modular routers for /api and /html
const apiRouter = require('./routes/api');
const htmlRouter = require('./routes/html');

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRouter);
app.use('/', htmlRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});
const express = require('express');
const connectDB = require('./config/db');

//create server
const app = express();

// connect to db

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

connectDB();

// port app
const PORT = process.env.PORT || 4000;

// run app
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


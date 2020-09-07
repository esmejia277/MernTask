const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//create server
const app = express();


app.get('/', (req, res) => {
  res.send('Hola mundo')
})

// connect to db
connectDB();

// enable cors
app.use(cors());

// enable express.json to read data from request
app.use(express.json({extended: true}));

// port app
const PORT = process.env.PORT || 4000;


//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));




// run app
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


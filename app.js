const express = require('express');
const app = express()
const db = require('./connect/dbConnect');

// open cross origin 
app.use(require('cors')())
app.use(express.json())

db.authenticate()
.then(()=> console.log('connect'))
.catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server run on port ${port}...`))
const express = require('express');
const app = express()

// open cross origin 
app.use(require('cors')())
app.use(express.json())

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server run on port ${port}...`))
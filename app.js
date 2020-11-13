const express = require('express');
const app = express()
const db = require('./connect/dbConnect');
const basicAuth = require('express-basic-auth');



// open cross origin 
app.use(require('cors')())
app.use(express.json())
// app.use(basicAuth({users:{
//     'grace':'firewall'
// }}))

db.authenticate()
.then(()=> console.log('connect'))
.catch(err => console.log(err));


// app endpoints
app.use('/api/user', require('./routes/user.route'));

app.use('/api/item', require('./routes/item.route'));

app.use('/api/auth', require('./routes/authentication'));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server run on port ${port}...`))
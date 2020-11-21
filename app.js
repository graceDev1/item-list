const express = require('express');
const app = express()
const db = require('./connect/dbConnect');
const basicAuth = require('express-basic-auth');
const swaggerUi = require('swagger-ui-express');
const SwaggerDoc = require('./swagger.json');


// open cross origin 
app.use(require('cors')())
app.use(express.json())
// app.use(basicAuth({users:{
//     'grace':'firewall'
// }}))

db.authenticate()
.then(()=> console.log('connect'))
.catch(err => console.log(err));

app.get('/',(req,res)=>{
    res.send(`<h2>welcome to Items list api</h2><br>
<h5> Go to /docs to cheek the documentation guide</h5>`);
})

app.use('/api/user', require('./routes/user.route'));

app.use('/api/item', require('./routes/item.route'));

app.use('/api/auth', require('./routes/authentication'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerDoc));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server run on port ${port}...`))
const express = require('express');
const app = express()
const db = require('./connect/dbConnect');
const basicAuth = require('express-basic-auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc  = require('swagger-jsdoc');



// open cross origin 
app.use(require('cors')())
app.use(express.json())
// app.use(basicAuth({users:{
//     'grace':'firewall'
// }}))

db.authenticate()
.then(()=> console.log('connect'))
.catch(err => console.log(err));


const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Un petit projet qui va permet a l'utilisateur de faire une liste des article a acheter",
        version: "1.0.0",
        description:
          "un API qui nous permet d'apprendre javascrit, jusqu'a la documentation",
        license: {
          name: "MIT",
          url: "https://choosealicense.com/licenses/mit/"
        },
        contact: {
          name: "Swagger",
          url: "https://swagger.io",
          email: "Info@SmartBear.com"
        }
      },
      servers: [
        {
          url: "http://localhost:5000/api/item"
        }
      ]
    },
    apis: ["./models/UserModel.js", "./models/ItemModel.js","./routes/item.route.js"]
  };
  const specs = swaggerDoc(options);
  app.use("/docs", swaggerUi.serve);
  app.get(
    "/docs",
    swaggerUi.setup(specs, {
      explorer: true
    })
  );



// app endpoints


app.use('/api/user', require('./routes/user.route'));




app.use('/api/item', require('./routes/item.route'));

app.use('/api/auth', require('./routes/authentication'));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server run on port ${port}...`))
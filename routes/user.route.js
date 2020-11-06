const route = require('express')();
const UserModel = require('../models/UserModel');


route.get('/', (req,res)=>{
    UserModel.findAll()
    .then((data)=> res.json(data))
    .catch(err => res.json(err));
})

module.exports = route;
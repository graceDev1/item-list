const route = require('express')();
const ItemModel = require('../models/ItemModel');

route.get('/', (req,res)=>{
    ItemModel.findAll()
    .then((data)=>{
        res.json(data);
    })
    .catch(err => console.log(err));
})

module.exports = route;
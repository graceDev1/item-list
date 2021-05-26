const route = require('express')();
const ItemModel = require('../models/ItemModel');

const auth = require('../middleware/authorization');

// const api_authorization = require('../middleware/api_key');


route.get('/',auth, (req,res)=>{
    ItemModel.findAll()
    .then((data)=>{
        res.json(data);
    })
    .catch(err => console.log(err));
});



// get items of one user
route.get('/:id',(req,res)=>{
    let tbUserId = req.params.id
    ItemModel.findAll({where: {tbUserId}, attributes: {exclude:['tbUserId']}}) 
    .then(data => {
        res.json(data);
    })
    .catch(err => console.log(err));
})


// add items to database
route.post('/', (req,res)=>{
    let { label, qte, tbUserId} = req.body;
    if(!label || !qte || !tbUserId ) return res.status(400).json({msg:'please fill all fields'});
    ItemModel.create({label, qte, tbUserId})
    .then(data=> res.json({msg: 'data inserted successfuly'}))
    .catch(err => console.log(err));
})


// add items to databases

route.delete('/:id', (req,res)=> {
    let id = req.params.id;
    ItemModel.destroy({where:{id}})
    .then(data => res.json({msg:'item was deleted successfully'}))
    .catch(err => console.log(err));
})

module.exports = route;
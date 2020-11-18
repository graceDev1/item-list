const route = require('express')();
const ItemModel = require('../models/ItemModel');

const auth = require('../middleware/authorization');

// const api_authorization = require('../middleware/api_key');

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management
 */


route.get('/',auth, (req,res)=>{
    ItemModel.findAll()
    .then((data)=>{
        res.json(data);
    })
    .catch(err => console.log(err));
});



// get items of one user
route.get('/:id',auth,(req,res)=>{
    let tbUserId = req.params.id
    ItemModel.findAll({where: {tbUserId}, attributes: {exclude:['tbUserId']}}) 
    .then(data => {
        res.json(data);
    })
    .catch(err => console.log(err));
})






// add items to database

/**
 * @swagger
 * path:
 *  /api/item/:
 *    post:
 *      summary: Create a new Item
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 *      responses:
 *        "200":
 *          description: A Item schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Item'
 */
route.post('/',auth, (req,res)=>{
    let { label, qte, tbUserId} = req.body;
    if(!label || !qte || !tbUserId ) return res.status(400).json({msg:'please fill all fields'});
    ItemModel.create({label, qte, tbUserId})
    .then(data=> res.json({msg: 'data inserted successfuly'}))
    .catch(err => console.log(err));
})



// add items to databases

route.delete('/:id',auth, (req,res)=> {
    let id = req.params.id;
    ItemModel.destroy({where:{id}})
    .then(data => res.json({msg:'item was deleted successfully'}))
    .catch(err => console.log(err));
})

module.exports = route;
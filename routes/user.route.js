const route = require('express')();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/authorization')


route.get('/',auth, (req,res)=>{
    UserModel.findAll({attributes: {exclude:['password']}})
    .then((data)=> res.json(data))
    .catch(err => res.json(err));
})


route.post('/', (req,res)=>{
    let { name, email, password} = req.body;
    // validation
    if(!name || !email || !password) return res.status(400).json({msg:'please fill all fields'});

    // check if user exist
    UserModel.findOne({where:{ email }})
    .then(user => {
        if(user) return res.status(502).json({msg:'user already exists'});
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err) throw err;
                password = hash;
                UserModel.create({name,email, password})
                .then(user => {
                    jwt.sign(
                        {id: user.id},
                        config.get('secret_key'),
                        {expiresIn: 3600},
                        (err, token) =>{
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                }).catch(err => console.log(err))
            })
        })

    }).catch(err => console.log(err));

})


module.exports = route;
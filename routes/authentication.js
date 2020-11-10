const route = require('express').Router()

const config = require('config');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

route.post('/', (req,res)=>{
    let { email , password} = req.body;
    if(!email || !password )return res.status(400).json({msg: 'please enter both email and password'});
    
    // check if user exists
    UserModel.findOne({where: { email }})
    .then(user => {
        if(!user) return res.status(502).json({msg: 'user does not exists'});
        bcrypt.compare(password,user.password)
        .then((isMatch)=> {
            if(!isMatch) return res.status(400).json({msg: 'password does matchs'});
            jwt.sign(
                {id:user.id},
                config.get('secret_key'),
                {expiresIn: 3600},
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            )
        })
    })
})


module.exports = route;
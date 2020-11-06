const Sequelize = require('sequelize');
const db = require('../connect/dbConnect');
const ItemModel = require('./ItemModel');

const UserModel = db.define('tb_users',
{
    name:{
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        isEmail: true
    },
    password:{
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
},
{ timestamps: false }
);

UserModel.belongsTo(ItemModel);

module.exports = UserModel;
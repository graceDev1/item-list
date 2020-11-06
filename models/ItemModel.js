const db = require('../connect/dbConnect');
const Sequelize = require('sequelize');


const ItemModel = db.define(
    'tb_items',
    {
        label:{
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        qty:{
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            isEmail: true
        }
    },
    { timestamps: false }
);

module.exports = ItemModel;
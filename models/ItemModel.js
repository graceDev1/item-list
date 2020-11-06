const db = require('../connect/dbConnect');
const Sequelize = require('sequelize');
const UserModel = require('./UserModel');

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
        },
        tbUserId:{
            type: Sequelize.INTEGER,
            required: true,
            allowNull: true
        }
    },
    { timestamps: false }
);
ItemModel.associate = () =>{
    ItemModel.belongsTo(UserModel, { foreignKey: 'tbUserId', as: 'tb_users'});
}


// ItemModel.belongsTo(UserModel);

module.exports = ItemModel;
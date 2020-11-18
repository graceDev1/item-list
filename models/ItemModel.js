const db = require('../connect/dbConnect');
const Sequelize = require('sequelize');
const UserModel = require('./UserModel');


/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - label
 *          - qte
 *          - tbUserId
 *        properties:
 *          label:
 *            type: string
 *          qte:
 *            type: int
 *          tbUserId:
 *             type: int
 *        example:
 *           label: joe
 *           qte: 1
 *           tbUserId: 1
 */

const ItemModel = db.define(
    'tb_items',
    {
        label:{
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        qte:{
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
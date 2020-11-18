const Sequelize = require('sequelize');
const db = require('../connect/dbConnect');
const ItemModel = require('./ItemModel');


/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *             type: string
 *             format: password
 *        example:
 *           name: joe
 *           email: joe@email.com
 *           password: v>^&
 */

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

module.exports = UserModel;
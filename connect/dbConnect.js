const Sequelize = require('sequelize');
const config = require('config');

const db = new Sequelize(config.get('databaseC'), config.get('userC'), config.get('passwordC'),{
    host: config.get('host'),
    dialect: 'mysql'
});

module.exports = db;
const Sequelize = require('sequelize');
const config = require('config');

const db = new Sequelize(config.get('database'), config.get('user'), config.get('password'),{
    host: config.get('host1'),
    dialect: 'mysql'
});

module.exports = db;
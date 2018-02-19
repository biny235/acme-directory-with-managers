const Sequelize = require ('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acmemanager');

module.exports = conn;
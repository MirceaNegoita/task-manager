require('dotenv/config')
const Sequelize = require('sequelize')

const host = process.env.SQL_HOST
const dialect = process.env.SQL_DIALECT
const database = process.env.SQL_DB_NAME
const username = process.env.SQL_DB_USER
const password = process.env.SQL_DB_PASSWORD 

module.exports = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
})
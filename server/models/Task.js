const Sequelize = require('sequelize')
const db = require('../config/database')

const Task = db.define('task', {
    title : {
        type: Sequelize.STRING,
        allowNull: false,
        len: [2,50],
        trim: true
    },
    description : {
        type: Sequelize.TEXT,
        allowNull: false,
        trim: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [2,50],
        trim: true
    },
})

module.exports = Task
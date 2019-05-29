const taskRoutes = require('./tasks')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Welcome to the task manager app')
    })
    app.use('/tasks', taskRoutes)
}
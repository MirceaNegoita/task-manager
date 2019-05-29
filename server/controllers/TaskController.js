const Task = require('../models/Task')

module.exports = {
    async getAllTasks(req, res){
        try {
            const tasks = await Task.findAll()
            res.status(200).send({
                tasks: tasks
            })
        } catch (error) {
            res.send({
                message: `Error retrieving tasks ${error}`
            })   
        }
    },
    async getTask(req, res){
        try {
            const task = await Task.findByPk(req.params.id)
            if (!task) {
                res.status(404).send({
                    message: `Task with id ${req.params.id} not found`
                })
            }
            res.status(200).send({
                task: task
            }) 
        } catch (error) {
            res.status(500).send({
                message: `Error retrieving task ${error}`
            })
        }
    },
    async createTask(req, res){
        const errors = await req.getValidationResult()
        
        if (!errors.isEmpty()) {
            res.status(500).send({
                errors: errors.mapped()
            })
        }

        try {
            const createdTask = await Task.create({
                title : req.body.title,
                description : req.body.description,
                status: req.body.status
            })
            res.status(200).send({
                task: createdTask
            })
        } catch (error) {
            res.status(500).send({
                message: `Error creating task ${error}`
            })
        }
    },
    async updateTaskStatus(req, res){
        console.table([req.body], [req.body.status])
        const errors = await req.getValidationResult()
        
        if (!errors.isEmpty()) {
            res.status(500).send({
                errors: errors.mapped()
            })
        }

        try {
            const updatedTask = await Task.update({
                status : req.body.status
            }, {
                where: {
                    id: req.params.id
                }
            })
            console.log(updatedTask)
            if (updatedTask == 0) {
                res.status(404).send({
                    message: `Task with id ${req.params.id} not found`
                })
            }
            res.status(200).send({
                message: `Task with id ${req.params.id} updated`
            })
        } catch (error) {
            res.status(500).send({
                message: `Error updating task ${error}`
            })
        }
    },
    async deleteTask(req, res){
        try {
            const deletedTask = await Task.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (!deletedTask) {
                res.status(404).send({
                    message: `Task with id ${req.params.id} not found`
                })
            }
            res.status(200).send({
                message: `Task with id ${req.params.id} deleted succesfully`
            })
        } catch (error) {
            res.status(500).send({
                message: `Error deleting task ${error}`
            })
        }
        
    }
}
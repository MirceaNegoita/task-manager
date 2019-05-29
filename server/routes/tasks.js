const express = require('express')
const TaskController = require('../controllers/TaskController')
const TaskMiddleware = require('../middlewares/TaskMiddleware')

const router = express.Router() 

router.get('/', TaskController.getAllTasks)
router.post('/create', TaskMiddleware.validate('createTask') ,TaskController.createTask)
router.get('/get/:id', TaskController.getTask)
router.put('/update/:id', TaskMiddleware.validate('updateTask') ,TaskController.updateTaskStatus)
router.delete('/delete/:id', TaskController.deleteTask)

module.exports = router


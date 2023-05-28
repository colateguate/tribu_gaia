const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks/all', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTask);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;

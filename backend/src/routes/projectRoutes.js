const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/projects/all', projectController.getProjects);
router.get('/projects/:id', projectController.getProject);
router.post('/projects', projectController.createProject);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;

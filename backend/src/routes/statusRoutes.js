// statusRoutes.js

const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.get('/status/all', statusController.getAllStatuses);
router.get('/status/for-select', statusController.getStatusForSelect);
router.get('/status/:id', statusController.getStatus);


module.exports = router;

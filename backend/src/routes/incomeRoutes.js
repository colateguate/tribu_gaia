const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');

router.get('/incomes/all', incomeController.getIncomes);
router.get('/incomes/:id', incomeController.getIncome);
router.post('/incomes', incomeController.createIncome);
router.put('/incomes/:id', incomeController.updateIncome);
router.delete('/incomes/:id', incomeController.deleteIncome);

module.exports = router;

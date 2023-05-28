const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/expenses/all', expenseController.getExpenses);
router.get('/expenses/for-select', expenseController.getExpensesForSelect);
router.get('/expenses/:id', expenseController.getExpense);
router.post('/expenses/create', expenseController.createExpense);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);


module.exports = router;

const express = require('express');
const router = express.Router();

const expenseCategoryController = require('../controllers/expenseCategoryController');

router.get('/expense-categories/all', expenseCategoryController.getExpenseCategories);
router.get('/expense-categories/for-select', expenseCategoryController.getExpenseCategoriesForSelect);
router.get('/expense-categories/:id', expenseCategoryController.getExpenseCategory);


module.exports = router;

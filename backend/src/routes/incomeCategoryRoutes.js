const express = require('express');
const router = express.Router();
const incomeCategoryController = require('../controllers/incomeCategoryController');

router.get('/income-categories/all', incomeCategoryController.getAllIncomeCategories);
router.get('/income-categories/for-select', incomeCategoryController.getAllIncomeCategoriesForSelect);
router.get('/income-categories/:id', incomeCategoryController.getIncomeCategoryById);


module.exports = router;

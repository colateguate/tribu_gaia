const ExpenseCategory = require('../models/ExpenseCategory');

exports.getExpenseCategories = async (req, res, next) => {
    try {
        const expenseCategories = await ExpenseCategory.find({});
        res.status(200).json(expenseCategories);
    } catch (error) {
        next(error);
    }
};

exports.getExpenseCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const expenseCategory = await ExpenseCategory.findById(id);
        if (!expenseCategory) {
            return res.status(404).json({ message: 'Expense category not found' });
        }
        res.status(200).json(expenseCategory);
    } catch (error) {
        next(error);
    }
};

exports.getExpenseCategoriesForSelect = async (req, res, next) => {
    try {
        const expenseCategories = await ExpenseCategory.find({}, 'id name');
        res.status(200).json(expenseCategories);
    } catch (error) {
        next(error);
    }
};

const Expense = require('../models/Expense');

const getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find().select('_id name amount');
        res.status(200).json(expenses);
    } catch (err) {
        next(err);
    }
};

const getExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findById(req.params.id).select('_id name amount');
        res.status(200).json(expense);
    } catch (err) {
        next(err);
    }
};

const getExpensesForSelect = async (req, res, next) => {
    try {
        const expenses = await Expense.find().select('_id name');
        res.status(200).json(expenses);
    } catch (err) {
        next(err);
    }
};

const createExpense = async (req, res, next) => {
    const newExpense = new Expense(req.body);
    try {
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        next(err);
    }
};

const updateExpense = async (req, res, next) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedExpense);
    } catch (err) {
        next(err);
    }
};

const deleteExpense = async (req, res, next) => {
    try {
        await Expense.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Expense removed successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getExpenses,
    getExpense,
    getExpensesForSelect,
    createExpense,
    updateExpense,
    deleteExpense
};

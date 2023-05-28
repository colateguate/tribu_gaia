const Income = require('../models/Income');

const getIncomes = async (req, res, next) => {
    try {
        const incomes = await Income.find().populate('income_category_id student_id', 'name');
        res.status(200).json(incomes);
    } catch (err) {
        next(err);
    }
};

const getIncome = async (req, res, next) => {
    try {
        const income = await Income.findById(req.params.id).populate('income_category_id student_id', 'name');
        if (!income) return res.status(404).send('Income not found');
        res.status(200).json(income);
    } catch (err) {
        next(err);
    }
};

const createIncome = async (req, res, next) => {
    try {
        const newIncome = new Income(req.body);
        const income = await newIncome.save();
        res.status(201).json(income);
    } catch (err) {
        next(err);
    }
};

const updateIncome = async (req, res, next) => {
    try {
        const income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!income) return res.status(404).send('Income not found');
        res.status(200).json(income);
    } catch (err) {
        next(err);
    }
};

const deleteIncome = async (req, res, next) => {
    try {
        const income = await Income.findByIdAndRemove(req.params.id);
        if (!income) return res.status(404).send('Income not found');
        res.status(200).json({ message: 'Income removed successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getIncomes,
    getIncome,
    createIncome,
    updateIncome,
    deleteIncome
};

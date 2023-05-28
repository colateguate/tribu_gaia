const IncomeCategory = require('../models/IncomeCategory');

exports.getAllIncomeCategories = async (req, res) => {
    const incomeCategories = await IncomeCategory.find({});
    return res.status(200).json(incomeCategories);
};

exports.getIncomeCategoryById = async (req, res) => {
    const incomeCategory = await IncomeCategory.findById(req.params.id);
    if (!incomeCategory) {
        return res.status(404).json({ error: 'IncomeCategory not found' });
    }
    return res.status(200).json(incomeCategory);
};

exports.getAllIncomeCategoriesForSelect = async (req, res) => {
    const incomeCategories = await IncomeCategory.find({}, '_id name');
    return res.status(200).json(incomeCategories);
};

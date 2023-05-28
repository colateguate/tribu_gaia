const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
}, {
    timestamps: true
});

const ExpenseCategory = mongoose.model('ExpenseCategory', ExpenseCategorySchema);

module.exports = ExpenseCategory;

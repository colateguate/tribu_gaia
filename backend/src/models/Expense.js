const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    expense_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenseCategory',
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;

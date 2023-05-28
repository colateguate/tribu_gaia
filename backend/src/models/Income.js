const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncomeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    income_category_id: {
        type: Schema.Types.ObjectId,
        ref: 'IncomeCategory',
        required: true
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Income = mongoose.model('Income', IncomeSchema);

module.exports = Income;

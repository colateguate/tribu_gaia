const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncomeCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const IncomeCategory = mongoose.model('IncomeCategory', IncomeCategorySchema);

module.exports = IncomeCategory;

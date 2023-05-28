const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tutor1: {
        type: String,
        required: true
    },
    tutor2: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip_code: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Status = mongoose.model('Status', StatusSchema);

module.exports = Status;

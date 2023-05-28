const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
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
    status_id: {
        type: Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    end_date: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

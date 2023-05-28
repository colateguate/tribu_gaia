const Task = require('../models/Task');

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().populate('status_id');
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate('status_id');
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

const createTask = async (req, res, next) => {
    try {
        const newTask = new Task(req.body);
        const task = await newTask.save();
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        await Task.findByIdAndRemove(req.params.id);
        res.status(204).json({ message: 'Task deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};

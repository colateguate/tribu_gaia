// statusController.js

const Status = require('../models/Status');

exports.getAllStatuses = async (req, res, next) => {
    try {
        const statuses = await Status.find().select('id name description');
        res.status(200).json(statuses);
    } catch (error) {
        next(error);
    }
};

exports.getStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const status = await Status.findById(id).select('id name description');
        if (!status) {
            return res.status(404).send();
        }
        res.status(200).json(status);
    } catch (error) {
        next(error);
    }
};

exports.getStatusForSelect = async (req, res, next) => {
    try {
        const statuses = await Status.find().select('id name');
        res.status(200).json(statuses);
    } catch (error) {
        next(error);
    }
};

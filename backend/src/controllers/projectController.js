const Project = require('../models/Project');

const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().populate('status_id');
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
};

const getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id).populate('status_id');
        res.status(200).json(project);
    } catch (err) {
        next(err);
    }
};

const createProject = async (req, res, next) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        next(err);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('status_id');
        res.status(200).json(updatedProject);
    } catch (err) {
        next(err);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
};

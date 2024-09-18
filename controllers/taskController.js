const Task = require('../models/taskModel');
const validateTask = require('../validators/taskValidator');

// CREATE NEW TASK
const createTask = async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({task,message:"Task created"});

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//TOGET ALL PAGINATION
const getTasks = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const tasks = await Task.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Task.countDocuments();
        
        res.json({
            tasks,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// TASK UPDATE
const updateTask = async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// TASK DELETE
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

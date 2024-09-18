const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(500),
    date: Joi.date(),
    completed: Joi.boolean()
});

const validateTask = (task) => taskSchema.validate(task);

module.exports = validateTask;

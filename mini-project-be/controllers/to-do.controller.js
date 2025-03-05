const Todo = require('../models/to-do.model')
const { Op } = require("sequelize");
const services = require('../services/to-do.service')

// Get All To-Dos (Authenticated User)
const getToDos = async (req, res) => {
    // ✅ Extract user ID from `req.user` (set in protect middleware)
    const userId = req.user.id;
    const result = await services.getAllToDo(userId);
    return res.status(200).json(result);
};


// Get a Single To-Do (Authenticated User)
const getToDo = async (req, res) => {
    // ✅ Extract user ID from `req.user` (set by JWT middleware)
    const userId = req.user.id;
    const { id } = req.query; // Extract To-Do ID from route parameter

    // ✅ Parse To-Do ID to integer
    const parsedId = parseInt(id, 10);

    // ✅ Validate To-Do ID
    if (!parsedId || isNaN(parsedId) || parsedId <= 0) {
        return res.status(400).json({ message: "Invalid To-Do ID" });
    }

    // ✅ Find the To-Do by primary key and user ID
    const result = await Todo.findOne({
        where: { id: parsedId, userId },
    });

    // ✅ Check if the To-Do exists for the authenticated user
    if (!result) {
        return res.status(404).json({ message: "To-Do not found for this user" });
    }

    return res.status(200).json(result);
};

// Get To-Do by Field (Authenticated User Only)
const getToDoByField = async (req, res) => {
    // ✅ Extract user ID from JWT (set by auth middleware)
    const userId = req.user.id;
    const { field, value } = req.query; // Extract field and value from request

    // ✅ Validate required parameters
    if (!field || !value) {
        return res.status(400).json({ message: "Field and value parameters are required" });
    }

    // ✅ Define allowed fields for querying
    const validFields = ["day", "task", "status", "priority"];
    if (!validFields.includes(field)) {
        return res.status(400).json({ message: "Invalid field parameter" });
    }

    // ✅ Query the database with userId validation
    const result = await Todo.findAll({
        where: {
            [field]: value, // Dynamic field lookup
            userId, // Ensure To-Do belongs to the authenticated user
        },
    });

    // ✅ Handle case when no records are found
    if (result.length === 0) {
        return res.status(404).json({ message: `No To-Do items found with ${field} = ${value} for this user` });
    }

    return res.status(200).json(result);
};

// Get To-Do by Date (Authenticated User Only)
const getToDoByDate = async (req, res) => {
    // ✅ Extract user ID from JWT (set by auth middleware)
    const userId = req.user.id;
    const { field, date } = req.query; // Extract field and date from request params

    // ✅ Validate required parameters
    if (!field || !date) {
        return res.status(400).json({ message: "Field and date parameters are required" });
    }

    // ✅ Define allowed date fields for querying
    const validDateFields = ["createdAt", "deletedAt"];
    if (!validDateFields.includes(field)) {
        return res.status(400).json({ message: "Invalid field parameter for date filtering" });
    }

    // ✅ Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({ message: `Invalid date format. Use YYYY-MM-DD. Received: ${date}` });
    }

    // ✅ Fetch records within the date range for the authenticated user
    const result = await Todo.findAll({
        where: {
            userId, // Ensure To-Do belongs to the authenticated user
            [field]: {
                [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
            },
        },
    });

    // ✅ Handle case when no records are found
    if (result.length === 0) {
        return res.status(404).json({ message: `No To-Do items found for date: ${date}` });
    }

    return res.status(200).json(result);
};

// Create To Do
const createToDo = async (req, res) => {
    // ✅ Extract user ID from `req.user` (set in protect middleware)
    const ownerId = req.user.id;
    const { ...data } = req.body; // Extract To-Do data (excluding userId)

    // ✅ Validate To-Do Data
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: "At least one field is required" });
    }

    // ✅ Create the To-Do with the authenticated user's ID
    const newRecord = await Todo.create({ ...data, userId: ownerId });

    return res.status(201).json(newRecord);
};

// Update To Do
const updateToDo = async (req, res) => {
    // ✅ Extract user ID from JWT (set by auth middleware)
    const userId = req.user.id;
    const { id, ...data } = req.body; // Extract `id` and update data

    const todoId = parseInt(id, 10);

    // ✅ Validate To-Do ID
    if (!Number.isInteger(todoId) || todoId <= 0) {
        return res.status(400).json({ message: "Invalid To-Do ID" });
    }

    // ✅ Ensure there is at least one field to update
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: "At least one field is required for update" });
    }

    // ✅ Check if the To-Do exists and belongs to the authenticated user
    const todo = await Todo.findOne({ where: { id: todoId, userId } });

    if (!todo) {
        return res.status(404).json({ message: "To-Do not found or does not belong to the user" });
    }

    // ✅ Perform the update
    const [updatedRows] = await Todo.update(data, { where: { id: todoId, userId } });

    if (updatedRows === 0) {
        return res.status(400).json({ message: "No changes were made" });
    }

    // ✅ Fetch and return the updated To-Do item
    const updatedToDo = await Todo.findByPk(todoId);

    return res.status(200).json(updatedToDo);
};

// Delete To Do
const deleteToDo = async (req, res) => {
    // ✅ Extract user ID from JWT (set by auth middleware)
    const userId = req.user.id;
    const { id } = req.body; // Extract `id` from request body

    const todoId = parseInt(id, 10);

    // ✅ Validate To-Do ID
    if (!Number.isInteger(todoId) || todoId <= 0) {
        return res.status(400).json({ message: "Invalid To-Do ID" });
    }

    // ✅ Check if the To-Do exists and belongs to the authenticated user
    const todo = await Todo.findOne({ where: { id: todoId, userId } });

    if (!todo) {
        return res.status(404).json({ message: "To-Do not found or does not belong to the user" });
    }

    // ✅ Delete the To-Do item
    await Todo.destroy({ where: { id: todoId, userId } });

    return res.status(200).json({ message: "To-Do deleted successfully" });
};

module.exports = { getToDos, getToDo, createToDo, updateToDo, deleteToDo, getToDoByField, getToDoByDate};
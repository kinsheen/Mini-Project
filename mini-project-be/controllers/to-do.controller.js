const service = require('../services/to-do.service')

// Get All To-Dos
const getToDos = async (req, res) => {
    const result = await service.getAllToDo()
    res.send(result)
}

// Get To-Do by ID
const getToDo = async (req, res) => {
    const id = req.params.id
    const result = await service.getToDoById(id)
    if (result.length === 0) {
        return res.status(404).json({ message: 'To-Do not found by id' })
    }
    res.status(200).json(result)
}

// Get To-Do by Field
const getToDoByField = async ({ params }, res) => {
    const { field, value } = params;
    if (!field || !value) {
        return res.status(400).json({ message: "Field and value parameters are required" });
    }

    // Define allowed fields
    const validFields = ["day", "task", "status", "priority"];
    if (!validFields.includes(field)) {
        return res.status(400).json({ message: "Invalid field parameter" });
    }

    const result = await service.getToDoByField(field, value);
    if (result.length === 0) {
        return res.status(404).json({ message: `No To-Do items found with ${field} = ${value}` });
    }
    res.status(200).json(result);
};

const getToDoByDate = async ({ query }, res) => {
    const { field, date } = query; // Extract start and end date from query params

    if (!field || !date) {
        return res.status(400).json({ message: "Fields are required" });
    }

    // Define allowed date fields
    const validDateFields = ["created_at", "deleted_at"];
    if (!validDateFields.includes(field)) {
        return res.status(400).json({ message: "Invalid field parameter for date filtering" });
    }

    // Validate date format (YYYY-MM-DD only)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." + date});
    }

    // Fetch records within the date range
    const result = await service.getToDoByDate(field, date);

    if (result.length === 0) {
        return res.status(404).json({ message: `No To-Do items found in date: ${date}` });
    }

    res.status(200).json(result);
};


// Create To-Do
const createToDo = async (req, res) => {
    const data = req.body; // Extract all fields dynamically

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "At least one field is required" });
    }

    // Construct dynamic column names and placeholders
    const placeholders = Object.keys(data).map(() => "?").join(", ");
    const fields = Object.keys(data).map(field => `\`${field}\``).join(", ");
    const values = Object.values(data);

    const newRecord = await service.createToDo(fields, placeholders, values)
    res.status(201).json(newRecord[0]); // Return the inserted to-do item

}

// Update To-Do
const updateToDo = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (!id || Object.keys(data).length === 0) {
        return null; // No valid update fields provided
    }

    const fields = Object.keys(data).map(field => `\`${field}\` = ?`).join(", ");
    const values = Object.values(data);

    const result = await service.updateToDo(id, fields, values)
    res.status(200).json(result)
}

// Delete To-Do
const deleteToDo = async (req, res) => {
    const id = req.params.id
    const affectedRows = await service.deleteToDo(id)

    if (affectedRows === 0) {
        res.status(404).json({ message: 'To-Do not found' })
    }
    
    res.status(201).json({ message: 'To-Do deleted successfully' })
}

module.exports = { getToDos, getToDo, createToDo, updateToDo, deleteToDo, getToDoByField, getToDoByDate };
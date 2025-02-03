const ToDoSchema = require('../models/to-do.model');

// Get All To-Dos
const getToDos = async (req, res) => {
    try {
        const toDos = await ToDoSchema.find().exec()
        res.status(200).json(toDos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get To-Do by ID
const getToDo = async (req, res) => {
    try {
        const toDo = await ToDoSchema.find(req.params.id).exec()
        res.status(200).json(toDo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get To-Do by Field
const getToDoByField = async (req, res) => {
    try {
        const { field, value } = req.params; // Extract field and value from URL params

        if (!field || !value) {
            return res.status(400).json({ message: "Field and value parameters are required" });
        }

        // Dynamic search: Find To-Do items where `field` matches `value`
        const toDos = await ToDoSchema.find({ [field]: value }).exec();

        if (toDos.length === 0) {
            return res.status(404).json({ message: `No To-Do items found with ${field} = ${value}` });
        }

        res.status(200).json(toDos);
    } catch (error) {
        console.error("Error fetching To-Do:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


// Create To-Do
const createToDo = async (req, res) => {
    try {
        const toDo = new ToDoSchema(req.body)
        await toDo.save()
        res.status(201).json(toDo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update To-Do
const updateToDo = async (req, res) => {
    try {

        const toDo = await ToDoSchema.findByIdAndUpdate(req.params.id, req.body);

        if (!toDo) {
            return res.status(404).json({ message: 'To-Do not found' })
        }

        const updatedToDo = await ToDoSchema.findById(req.params.id).exec()
        res.status(200).json(updatedToDo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete To-Do
const deleteToDo = async (req, res) => {
    try {

        const toDo = await ToDoSchema.findByIdAndDelete(req.params.id).exec();

        if (!toDo) {
            return res.status(404).json({ message: 'To-Do not found' })
        }

        res.status(204).json( { message: 'To-Do deleted successfully' } )
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getToDos, getToDo, createToDo, updateToDo, deleteToDo, getToDoByField };
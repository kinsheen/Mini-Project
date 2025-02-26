const User = require('../models/user.model')
const { isAdmin } = require("../middlewares/auth.middleware");

const getUsers = async (req, res) => {
    // ✅ Fetch all users
    const users = await User.findAll();
    return res.status(200).json(users);
};

// Get User by ID
const getUser = async (req, res) => {
    const { id } = req.query; // Extract ID and userId from URL

    // ✅ Parse to integer
    const parsedId = parseInt(id, 10);

    // ✅ Validate User ID
    if (!parsedId || isNaN(parsedId) || !Number.isInteger(Number(parsedId)) || Number(parsedId) <= 0) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    // ✅ Find the To-Do by primary key and user ID
     const result = await User.findOne({
        where: {
            id: Number(parsedId),
        },
    });

    // ✅ Check if record exists for the given userId
    if (!result) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(result);
}

// Create User
const createUser = async (req, res) => {
    const data  = req.body; // Extract `userId` and the rest of the data
    
    // ✅ Validate User Data
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: "At least one field is required" });
    }

    // ✅ Ensure `userId` is added to the data
    const newRecord = await User.create(data);

    // ✅ Return the inserted To-Do item
    return res.status(201).json(newRecord);

}

// Update User
const updateUser = async (req, res) => {
    try {
        // ✅ Extract user ID from JWT (set by auth middleware)
        const authenticatedUserId = req.user.id;
        const isAdmin = req.user.role === "admin"; // Check if user is an admin

        const { id, ...data } = req.body;
        const parsedId = parseInt(id, 10);

        // ✅ Validate User ID
        if (!Number.isInteger(parsedId) || parsedId <= 0) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // ✅ Restrict updates: User can only update their own profile unless they are an admin
        if (!isAdmin && parsedId !== authenticatedUserId) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own profile" });
        }

        // ✅ Ensure at least one field is being updated
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "At least one field is required for update" });
        }

        // ✅ Check if the user exists
        const user = await User.findOne({ where: { id: parsedId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Perform the update
        const [updatedRows] = await User.update(data, { where: { id: parsedId } });

        if (updatedRows === 0) {
            return res.status(400).json({ message: "No changes were made" });
        }

        // ✅ Fetch and return the updated user
        const updatedUser = await User.findByPk(parsedId);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// Delete To-Do
const deleteUser = async (req, res) => {
    const { id } = req.body; // Extract `id` and `userId` from JSON body
    const userId = parseInt(id, 10);

    if (!Number.isInteger(userId)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    // Check if the to-do exists and belongs to the given userId
    const todo = await User.findOne({ where: { id: userId } });

    if (!todo) {
        return res.status(404).json({ message: "User not found." });
    }

    // Delete the to-do item
    await User.destroy({ where: { id: userId} });

    return res.status(200).json({ message: "User deleted successfully" });
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser};

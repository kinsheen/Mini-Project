const AchievementSchema = require('../models/achievement.model');

// Get All Achievements
const getAchievements = async (req, res) => {
    try {
        const achievements = await AchievementSchema.find().exec()
        res.status(200).json(achievements)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get Achievement by ID
const getAchievement = async (req, res) => {
    try {
        const achievement = await AchievementSchema.find(req.params.id).exec()
        res.status(200).json(achievement)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Create Achievement
const createAchievement = async (req, res) => {
    try {
        const achievement = new AchievementSchema(req.body)
        await achievement.save()
        res.status(201).json(achievement)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update Achievement
const updateAchievement = async (req, res) => {
    try {
        const { id } = req.params;
        const achievement = await AchievementSchema.findByIdAndUpdate(id, req.body, { new: true }).exec() // Find and update by ID
        
        if (!achievement) {
            return res.status(404).json({ message: `Achievement not found with ID: ${id}` });
        }

        const updatedAchievement = await AchievementSchema.findById(id).exec(); // Find updated document
        res.status(200).json(updatedAchievement);
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
}

// Delete Achievement
const deleteAchievement = async (req, res) => {
    try {
        const { id } = req.params;
        const achievement = await AchievementSchema.findByIdAndDelete(id).exec()

        if (!achievement) {
            return res.status(404).json({ message: `Achievement not found with ID: ${id}` });
        }

        res.status(200).json({ message: `Achievement deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getAchievements, getAchievement, createAchievement, updateAchievement, deleteAchievement };
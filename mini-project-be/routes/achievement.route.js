const express = require('express');
const router = express.Router();
const {getAchievements, getAchievement, createAchievement, updateAchievement, deleteAchievement} = require('../controllers/achievement.controller');

router.get('/', getAchievements);
router.get('/:id', getAchievement);
router.post('/', createAchievement);
router.put('/:id', updateAchievement);
router.delete('/:id', deleteAchievement);

module.exports = router;
const mongoose =  require('mongoose');

const AchievementSchema = mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Description is required']
    }
},
{
    timestamps: true
});

const Achievement = mongoose.model('Achievement', AchievementSchema);
module.exports = Achievement;
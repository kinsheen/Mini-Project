const mongoose =  require('mongoose');

const ToDoSchema = mongoose.Schema({
    day: {
        type: String,
        required: [true, 'Day is required']
    },
    task: {
        type: String,
        required: [true, 'Description is required']
    },
    status: {
        type: String,
        required: [true, 'Status is required']
    },
    priority: {
        type: Boolean,
        required: [true, 'Priority is required']
    },
    note: {
        type: String,
        required: [false]
    }
},
{
    timestamps: true
});

const ToDo = mongoose.model('ToDo', ToDoSchema);
module.exports = ToDo;
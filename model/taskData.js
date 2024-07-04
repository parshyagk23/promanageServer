const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        userId: {
            type: String
        },
        blog: {
            type: String,
            default: 0
        },
        todos: [{
            checked: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                required: true
            }
        }],
        dueDate: {
            type: String,
            default: ''
        },

    },
    {timestamps:{createdAt:'createdAt' , updatedAt:'UpdatedAt'}}
)

module.exports = mongoose.model('Task', taskSchema)

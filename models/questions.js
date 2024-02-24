const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    chapter: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum : ['multiple', 'open', 'upload'],
        default: 'multiple'
    },
    options: [{
        text: {
            type: String,
        },
        isCorrect: {
            type: Boolean,
            default: false
        }
    }],
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("questions", QuestionSchema);
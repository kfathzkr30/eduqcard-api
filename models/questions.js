const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    examId: {
        type: String,
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
        option: {
            type: String,
        },
        isCorrect: {
            type: Boolean,
            default: false
        }
    }],
    correctAnswer: {
        type: String,
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("questions", QuestionSchema);
const mongoose = require("mongoose");

const studentAnswerSchema = new mongoose.Schema({
    chapterId: {
        type: String,
        required: true,
    },
    chapterNumber: {
        type: Number,
        required: true,
    },
    chapterType: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pass', 'fail', 'waiting'],
        default: 'waiting'
    },
    answers: [{
        question: {
            type: String,
        },
        userAnswer: {
            type: String,
        },
        correctAnswer: [{
            type: String,
        }],
        correctKeyword: [{
            type: String,
        }]
    }]
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("studentAnswers", studentAnswerSchema);
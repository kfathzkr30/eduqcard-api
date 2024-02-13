const mongoose = require("mongoose");

const UserExamsSchema = new mongoose.Schema({
    examId: {
        type: String,
        required: true,
        unique: true
    },
    examName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    fullname: {
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
    review: [{
        question: {
            type: String,
        },
        userAnswer: {
            type: String,
        },
        correctAnswer: {
            type: String,
        }
    }]
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("userExams", UserExamsSchema);
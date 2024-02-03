const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  creatorId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    lowercase: true,
  },
  chapter: {
    type: Number,
    lowercase: true,
  },
  passGrade: {
    type: Number,
    default: 2,
  },
  time: {
    type: Number,
    default: 20,
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("exams", ExamSchema);


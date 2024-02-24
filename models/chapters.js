const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  desc: {
    type: Text,
  },
  passGrade: {
    type: Number,
    default: 7,
  },
  time: {
    type: Number,
    default: 20,
  },
  type: {
    type: String,
    required: true,
    enum : ['multiple', 'open', 'upload'],
    default: 'multiple'
  }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chapters", ChapterSchema);


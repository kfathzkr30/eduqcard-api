const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  desc: {
    type: String,
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
    enum : ['pilihan ganda', 'essai', 'upload file'],
    default: 'pilihan ganda',
  }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chapters", ChapterSchema);


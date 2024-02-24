const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    kelas: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('students', StudentSchema)
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const studentRoute = require('./routes/students')
const questionRoute = require('./routes/questions')
const studentAnswerRoute = require('./routes/studentAnswers')
const chapterRoute = require('./routes/chapters')
const teacherRoute = require('./routes/teachers')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_ACCESS).then(data => {
    console.log("connected to DB")
}).catch(error => {
    console.log(error)
})

app.use('/student', studentRoute)
app.use('/teacher', teacherRoute)
app.use('/question', questionRoute)
app.use('/chapter', chapterRoute)
app.use('/answer', studentAnswerRoute)

app.listen(5000, () => {
    console.log('Server started on 5000')
})




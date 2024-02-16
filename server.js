const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoute = require('./routes/users')
const examQuestionsRoute = require('./routes/questions')
const userExamsRoute = require('./routes/userExams')
const examRoute = require('./routes/exams')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_ACCESS).then(data => {
    console.log("connected to DB")
}).catch(error => {
    console.log(error)
})

app.use('/users', userRoute)
app.use('/examquestions', examQuestionsRoute)
app.use('/exam', examRoute)
app.use('/userexams', userExamsRoute)

app.listen(5000, () => {
    console.log('Server started on 5000')
})




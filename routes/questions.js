const express = require('express')
const ExamQuestions = require('../models/questions')
const router = express.Router()

//Get ExamQ(s)
router.get('/', (req, res) => {
    ExamQuestions.find().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        res.status(500).json({ message: e })
    })
})

//GET ExamQ
router.get("/:id", async (req, res) => {
    try {
        ExamQuestions.find({ examId: req.params.id }).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.post('/', (req, res) => {
    if (req.body.type === 'open' || req.body.type === 'upload')  req.body.options = null
 
    const examQuestions = new ExamQuestions({
        examId: req.body.examId,
        title: req.body.title,
        type: req.body.type,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer,
    })
    examQuestions.save().then(data => {
        res.status(201).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.put("/option/:id", (req, res) => {
    ExamQuestions.updateOne({ _id: req.params.id }, {
        $push: {
            options: req.body.options,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.patch('/:id', (req, res) => {
    if (req.body.type === 'open' || req.body.type === 'upload')  req.body.options = null
    ExamQuestions.updateOne({ _id: req.params.id }, {
        $set: {
            examId: req.body.examId,
            title: req.body.title,
            type: req.body.type,
            options: req.body.options,
            correctAnswer: req.body.correctAnswer,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.delete('/:id', (req, res) => {
    ExamQuestions.deleteOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json(data)
        }).catch(e => {
            res.status(500).json({ message: e })
        })
})

module.exports = router;
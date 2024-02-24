const express = require('express')
const Question = require('../models/questions')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()

//Get ExamQ(s)
router.get('/', (req, res) => {
    Question.find().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        res.status(500).json({ message: e })
    })
})

//GET ExamQ
router.get("/:chapter", async (req, res) => {
    try {
        Question.find({ chapter: req.params.chapter }).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.post('/', (req, res) => {
    if (req.body.type === 'open' || req.body.type === 'upload')  req.body.options = null

    let optionsWithId = []
    if (req.body.type === 'multiple' && req.body.options) {
        optionsWithId = req.body.options.map(option => ({
            id: uuidv4(),
            text: option.text,
            isCorrect: option.isCorrect || false
        }));
    }
 
    const examQuestions = new Question({
        chapter: req.body.chapter,
        title: req.body.title,
        type: req.body.type,
        options: optionsWithId,
    })

    examQuestions.save().then(data => {
        res.status(201).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.put("/option/:id", (req, res) => {

    let optionsWithId = []
    if (req.body.options) {
        optionsWithId = req.body.options.map(option => ({
            id: uuidv4(),
            text: option.text,
            isCorrect: option.isCorrect || false
        }));
    }

    Question.updateOne({ _id: req.params.id }, {
        $push: {
            options: optionsWithId,
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
    
    let optionsWithId = []
    if (req.body.options) {
        optionsWithId = req.body.options.map(option => ({
            id: uuidv4(),
            text: option.text,
            isCorrect: option.isCorrect || false
        }));
    }

    Question.updateOne({ _id: req.params.id }, {
        $set: {
            chapter: req.body.chapter,
            title: req.body.title,
            type: req.body.type,
            options: optionsWithId,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.delete('/:id', (req, res) => {
    Question.deleteOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json(data)
        }).catch(e => {
            res.status(500).json({ message: e })
        })
})

module.exports = router;
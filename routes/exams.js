const express = require('express')
const Exam = require('../models/exams')
const router = express.Router()

//Get Exam(s)
router.get('/', (req, res) => {
    Exam.find().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

//GET Exam
router.get("/:id", async (req, res) => {
    try {
        Exam.find({ creatorId: req.params.id}).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }
});

//GET Exam by examId
router.get("/exam/:id", async (req, res) => {
    try {
        Exam.find({ _id: req.params.id }).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }
});

router.post('/', (req, res) => {
    const exam = new Exam({
        creatorId: req.body.creatorId,
        name: req.body.name,
        chapter: req.body.chapter,
        passGrade: req.body.passGrade,
        time: req.body.time,
    })
    exam.save().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.patch('/:id', (req, res) => {
    Exam.updateOne({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            chapter: req.body.chapter,
            passGrade: req.body.passGrade,
            time: req.body.time,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.delete('/:id', (req, res) => {
    Exam.deleteOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json(data)
        }).catch(e => {
            console.log(e)
            res.status(500).json({ message: e })
        })
})

module.exports = router;
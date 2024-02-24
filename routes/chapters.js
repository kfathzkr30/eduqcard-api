const express = require('express')
const Chapter = require('../models/chapters')
const StudentAnswer = require('../models/studentAnswers')
const router = express.Router()

//Get Chapter(s)
router.get('/', (req, res) => {
    Chapter.find().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

//GET Chapter
router.get("/student/:id", async (req, res) => {
    try {
        const chapters = await Chapter.find()
        const studentAnswers = await StudentAnswer.find({ studentId: req.params.id })

        for (let i = 0; i < chapters.length; i++) {
            const chapter = chapters[i];

            for (let j = 0; j < studentAnswers.length; j++) {
                const studentAns = studentAnswers[j];
                
                if (chapter.number === studentAns.chapterNumber) {
                    chapter.status = "unlocked"
                } else {
                    chapter.status = "locked"
                }
            }
        }

        return res.status(200).json(chapters)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }
});

//GET Chapter by chapter Number
router.get("/chapter/:number", async (req, res) => {
    try {
        Chapter.findOne({ number: req.params.number }).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }
});

router.post('/', (req, res) => {
    const body = req.body

    const chapter = new Chapter({
        number: body.number,
        desc: body.desc,
        passGrade: body.passGrade,
        time: body.time,
        type: body.type,
    })
    chapter.save().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.patch('/:number', (req, res) => {
    Chapter.updateOne({ number: req.params.number }, {
        $set: {
            number: body.number,
            desc: body.desc,
            passGrade: body.passGrade,
            time: body.time,
            type: body.type,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.delete('/:number', (req, res) => {
    Chapter.deleteOne({ number: req.params.number })
        .then(data => {
            res.status(200).json(data)
        }).catch(e => {
            console.log(e)
            res.status(500).json({ message: e })
        })
})

module.exports = router;
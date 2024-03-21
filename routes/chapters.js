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
        const oldChapters = await Chapter.find()
        const studentAnswers = await StudentAnswer.find({ studentId: req.params.id })
        
        const chapters = oldChapters.map(chapter => {
            return {...chapter.toObject(), status: "locked", grade: 0 }
        })

        for (let i = 0; i < chapters.length; i++) {
            const chapter = chapters[i];

            if (chapter.number === 1 && !studentAnswers.length) {
                chapter.status = "unlocked";
            } else if (studentAnswers.length){
                for (let j = 0; j < studentAnswers.length; j++) {
                    const studentAns = studentAnswers[j];
                    if (chapter.number === studentAns.chapterNumber) {
                        chapter.grade = studentAns.grade > chapter.grade ? studentAns.grade : chapter.grade
                        if (studentAns.status === 'pass') {
                            chapter.status = "finished";
                            if (i < 2) {
                                chapters[i + 1].status = "unlocked"
                            }
                            break
                        }
                        chapter.status = "unlocked"
                    } 
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
router.get("/:number", async (req, res) => {
    try {
        Chapter.findOne({ number: req.params.number }).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const body = req.body

    const existChapter = await Chapter.find({ number: body.number })
    if (existChapter.length) {
        return res.status(400).json({ message: 'Chapter number already exists'})
    }

    const chapter = new Chapter({
        number: +body.number,
        desc: body.desc,
        passGrade: +body.passGrade,
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
    const body = req.body
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
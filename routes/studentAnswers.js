const express = require('express')
const UserAnswer = require('../models/studentAnswers')
const router = express.Router()

router.get('/', (req, res) => {
    UserAnswer.find().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        res.status(500).json({ message: e })
    })
})

//spesific student and chapter
router.get("/student", async (req, res) => {
    try {
        UserAnswer.find({ chapterNumber: req.query.chapterNumber, studentId: req.query.studentId }).sort({createdAt: -1}).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// specific chapter for teacher
router.get("/chapter/:number", async (req, res) => {
    try {
        UserAnswer.find({ chapterNumber: req.params.number,}).then(data => {
            console.log("userexam", data)
            res.status(200).json(data)
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

/*

router.get("/exam/:id", async (req, res) => {
    try {
        let resultList = [];
        const userExams = UserAnswer.find({ examId: req.params.id });

        userExams.forEach(element => {
            const user = Users.findOne(element.userId);

            resultList.push({
                usename: user.name,
                examId: element.examId,
                userExamId: element,
            })

        });



    } catch (err) {
        res.status(500).json({ message: err });
    }
});

*/

router.post('/', (req, res) => {
    const userExams = new UserAnswer({
        chapterId: req.body.chapterId,
        chapterNumber: +req.body.chapterNumber,
        chapterType: req.body.chapterType,
        studentId: req.body.studentId,
        studentName: req.body.studentName,
        grade: req.body.grade,
        answers: req.body.answers,
        status: req.body.status || 'waiting',
    })
    userExams.save().then(data => {
        res.status(201).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.put("/:id", (req, res) => {
    UserAnswer.updateOne({ _id: req.params.id }, {
        $push: {
            answers: req.body.answers,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        res.status(500).json({ message: e })
    })
})

router.patch('/:id', (req, res) => {
    UserAnswer.updateOne({ _id: req.params.id }, {
        $set: {
            chapterId: req.body.chapterId,
            chapterNumber: req.body.chapterNumber,
            chapterType: req.body.chapterType,
            studentId: req.body.studentId,
            studentName: req.body.studentName,
            grade: req.body.grade,
            status: req.body.status,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        res.status(500).json({ message: e })
    })
})

router.delete('/:id', (req, res) => {
    UserAnswer.deleteOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json(data)
        }).catch(e => {
            res.status(500).json({ message: e })
        })
})

module.exports = router;
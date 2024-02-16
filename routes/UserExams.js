const express = require('express')
const UserExams = require('../models/userExams')
const router = express.Router()

router.get('/', (req, res) => {
    UserExams.find().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        res.status(500).json({ message: e })
    })
})

//spesific exam
router.get("/:id", async (req, res) => {
    try {
        UserExams.find({ userId: req.params.id }).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/exam/:id", async (req, res) => {
    try {
        UserExams.find({ examId: req.params.id,  }).then(data => {
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
        const userExams = UserExams.find({ examId: req.params.id });

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
    const userExams = new UserExams({
        examId: req.body.examId,
        examName: req.body.examName,
        userId: req.body.userId,
        fullname: req.body.fullname,
        grade: req.body.grade,
        review: req.body.review,
        status: req.body.status || 'waiting',
    })
    userExams.save().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.put("/:id", (req, res) => {
    UserExams.updateOne({ _id: req.params.id }, {
        $push: {
            review: req.body.review,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        res.status(500).json({ message: e })
    })
})

router.patch('/:id', (req, res) => {
    UserExams.updateOne({ _id: req.params.id }, {
        $set: {
            examId: req.body.examId,
            userId: req.body.userId,
            grade: req.body.grade,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        res.status(500).json({ message: e })
    })
})

router.delete('/:id', (req, res) => {
    UserExams.deleteOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json(data)
        }).catch(e => {
            res.status(500).json({ message: e })
        })
})

module.exports = router;
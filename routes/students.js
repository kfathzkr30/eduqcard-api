const express = require('express')
const Student = require('../models/students')
const router = express.Router()

router.get('/', (req, res) => {
    Student.find().then(data => {
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        res.status(err.status || 500).json({ message: err });
    })
})

router.get("/:id", async (req, res) => {
    try {
        Student.find({ _id: req.params.id }).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(err.status | 500).json({ message: err });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { name, kelas } = req.body;

        const studentExist = await Student.findOne({ name: name.toLowerCase(), kelas: kelas.toLowerCase()})
        if (studentExist) {
            return res.status(200).json(studentExist);
        }

        const createdStudent = await Student.create({
            name: name.toLowerCase(),
            username: name.toLowerCase().split(" ").join(""),
            kelas: kelas
        })

        return res.status(201).json(createdStudent);
    } catch (err) {
        console.log(err)
        return res.json({ message: "Gagal menambah pengguna." })
    }
})

// router.post("/login", async (req, res) => {
//     try {
//         const { nis, password } = req.body;
//         console.log(req.body)
//         const user = await Student.findOne({ nis })
//         if (!user){
//             return res.status(400).json({ message: "Pengguna tidak terdaftar." })
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, user.password)
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: "Password salah." })
//         }

//         return res.status(200).json({ user, message: 'Sukses login.' })
//     } catch (error) {
//         return res.status(400).json({ message: error.message })
//     }
// })

router.patch('/:id', async (req, res) => {
    const { name, username, kelas} = req.body
    Student.updateOne({ _id: req.params.id }, {
        $set: {
            name: name.toLowerCase(),
            username: username.toLowerCase(),
            kelas: kelas,
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.delete('/:id', (req, res) => {
    Student.deleteOne({
         _id: req.params.id 
    })
    .then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

module.exports = router;
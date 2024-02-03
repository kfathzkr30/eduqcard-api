const express = require('express')
const bcrypt = require('bcrypt');
const User = require('../models/users')
const router = express.Router()

router.get('/', (req, res) => {
    User.find().then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(err)
        res.status(err.status | 500).json({ message: e });
    })
})

//spesific user
router.get("/:id", async (req, res) => {
    try {
        User.find({ _id: req.params.id }).then(data => {
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(err.status | 500).json({ message: err });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        const userExists = await User.findOne({ email })
        if (userExists)
            return res.status(400).json({ message: 'Pengguna sudah terdaftar.' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await User.create({
            fullname,
            username,
            email,
            password: hashedPassword
        })

        return res.status(201).json(createdUser);
    } catch (error) {
        console.log(error)
        return res.json({ message: "Gagal menambah pengguna." })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email })
        if (!user){
            return res.status(400).json({ message: "Pengguna tidak terdaftar." })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password salah." })
        }

        return res.status(200).json({ user, message: 'Sukses login.' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    User.updateOne({ _id: req.params.id }, {
        $set: {
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.status(500).json({ message: e })
    })
})

router.delete('/:id', (req, res) => {
    User.deleteOne({
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
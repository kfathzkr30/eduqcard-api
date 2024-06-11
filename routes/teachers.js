const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (email != 'teacher@edciviq.com') {
			return res.status(400).json({ message: 'Email salah' });
		}

		if (password != 'iamteacher') {
			return res.status(400).json({ message: 'Password salah' });
		}

		return res.status(200).json({
			id: 1,
			email: email,
		});
	} catch (err) {
		console.log(err);
		return res.json({ message: 'Gagal menambah pengguna.' });
	}
});

module.exports = router;

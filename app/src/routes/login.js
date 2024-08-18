const express = require('express');
const router = express.Router();
const Donor = require('../models/donor'); // Assuming Donor is your model

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Donor.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Login failed' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Login failed' });
        }

        res.json({ message: 'Successfully Login' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});

module.exports = router;

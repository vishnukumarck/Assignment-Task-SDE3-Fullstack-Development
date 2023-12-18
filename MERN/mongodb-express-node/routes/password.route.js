const express = require('express');
const router = express.Router();
const PasswordStrength = require('../Models/passwordStrengthSchema');

// Route to handle password strength check
router.post('/', async (req, res) => {
    const { password, steps } = req.body;

    try {
        // Create a new PasswordStrength document
        const passwordStrength = new PasswordStrength({ password, steps });
        await passwordStrength.save();
        res.json({ steps });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the data.' });
    }
});

// Route to get all records from PasswordStrength
router.get('/', async (req, res) => {
    try {
        const records = await PasswordStrength.find();
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the data.' });
    }
});

module.exports = router;

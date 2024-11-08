const express = require('express');
const donorRouter = express.Router();
const mongoose = require('mongoose');
const Donor = require('../models/donor.model.js');
const multer = require('multer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


// Utility function to remove undefined fields from an object
const removeUndefinedFields = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
};

// Utility function to validate password strength
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Get all donors
donorRouter.get('/', async (req, res) => {
    try {
        const donors = await Donor.find();
        if (donors.length === 0) {
            return res.status(404).json({ message: 'No donors found' });
        }
        res.json(donors);
    } catch (err) {
        console.error('Error fetching donors:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Donor registration
donorRouter.post('/register', multer().none(), async (req, res) => {
    const donorData = removeUndefinedFields({
        fullname: req.body.fullname,
        age: req.body.age,
        gender: req.body.gender,
        aadhar: req.body.aadhar,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        blood_type: req.body.blood_type,
        medical_history: req.body.medical_history,
        infection_diseases: req.body.infection_diseases,
        surgical_history: req.body.surgical_history,
        allergies: req.body.allergies,
        smoking_status: req.body.smoking_status,
        alcohol_consumption: req.body.alcohol_consumption,
        drug_use: req.body.drug_use,
        diet_exercise: req.body.diet_exercise,
        organ_to_donate: req.body.organ_to_donate,
        any_condition: req.body.any_condition,
        next_of_kin: req.body.next_of_kin,
        kin_contact: req.body.kin_contact,
        legal_authorization: req.body.legal_authorization,
        password: req.body.password // Ensure password is included
    });

    // Validate the password
    if (!validatePassword(donorData.password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.', success: false });
    }

    try {
        console.log('Donor data:', donorData);
        const hashedPassword = await bcrypt.hash(donorData.password, 10);
        donorData.password = hashedPassword;

        const newDonor = new Donor(donorData);
        await newDonor.save();
        console.log('Donor registered successfully');
        res.status(200).json({ message: 'Donor registered successfully', success: true });
    } catch (err) {
        console.error('Error inserting donor:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});


// Search for a specific donor by aadhar number
donorRouter.post('/search', async (req, res) => {
    try {
        const { aadhar } = req.body; // Get the aadhar number from the request body
        const donor = await Donor.findOne({ aadhar });
        if (!donor) {
            return res.status(404).json({ error: 'Donor not found' });
        }
        res.json(donor);
    } catch (err) {
        console.error('Error searching donor:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch donor info by email or ID (after login)
donorRouter.get('/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const donor = await Donor.findOne({ email });

        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        return res.status(200).json(donor);
    } catch (err) {
        console.error('Error fetching donor:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = donorRouter;

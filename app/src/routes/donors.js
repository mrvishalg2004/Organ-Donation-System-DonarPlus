const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Donor = require('../models/donor');

// Define the schema for the donor
const donorSchema = new mongoose.Schema({
    fullname: String,
    age: String,
    gender: String,
    aadhar: String,
    phone: String,
    email: String,
    address: String,
    blood_type: String,
    medical_history: String,
    infection_diseases: String,
    surgical_history: String,
    allergies: String,
    smoking_status: String,
    alcohol_consumption: String,
    drug_use: String,
    diet_exercise: String,
    organ_to_donate: String,
    any_condition: String,
    next_of_kin: String,
    kin_contact: String,
    legal_authorization: String
});

const Donor = mongoose.model('Donor', donorSchema);

// Handle donor registration
router.post('/register', async (req, res) => {
    const {
        fullname,
        age,
        gender,
        aadhar,
        phone,
        email,
        address,
        blood_type,
        medical_history,
        infection_diseases,
        surgical_history,
        allergies,
        smoking_status,
        alcohol_consumption,
        drug_use,
        diet_exercise,
        organ_to_donate,
        any_condition,
        next_of_kin,
        kin_contact,
        legal_authorization,
        password
    } = req.body;
    // const {
    //     fullname,
    //     age,
    //     gender,
    //     aadhar,
    //     phone,
    //     email,
    //     address,
    //     blood_type,
    //     medical_history,
    //     infection_diseases,
    //     surgical_history,
    //     allergies,
    //     smoking_status,
    //     alcohol_consumption,
    //     drug_use,
    //     diet_exercise,
    //     organ_to_donate,
    //     any_condition,
    //     next_of_kin,
    //     kin_contact,
    //     legal_authorization
    // } = req.body;

// Validate required fields
if (!fullname || !age || !gender || !aadhar || !phone || !email || !address || !password) {
    return res.status(400).json({ success: false, message: 'Required fields are missing' });
}

    try {
        const newDonor = new Donor({
            fullname,
            age,
            gender,
            aadhar,
            phone,
            email,
            address,
            blood_type,
            medical_history,
            infection_diseases,
            surgical_history,
            allergies,
            smoking_status,
            alcohol_consumption,
            drug_use,
            diet_exercise,
            organ_to_donate,
            any_condition,
            next_of_kin,
            kin_contact,
            legal_authorization,
            password: hashedPassword
        });

        await newDonor.save();
        res.json({ success: true, message: 'Donor registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to register donor' });
    }
});

// Handle donor login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const donor = await Donor.findOne({ email });
        if (!donor) {
            return res.status(404).json({ success: false, message: 'Donor not found' });
        }

        // Compare password
        const match = await bcrypt.compare(password, donor.password);
        if (match) {
            // Generate JWT token
            const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, message: 'Login successful', token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to log in' });
    }
});

module.exports = router;

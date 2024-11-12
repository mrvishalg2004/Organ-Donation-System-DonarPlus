const express = require('express');
const patientRouter = express.Router();
const mongoose = require('mongoose');
const Patient = require('../models/patient.model.js'); // Adjust the path if necessary
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

// Get all patients
patientRouter.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        if (patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }
        res.status(200).json(patients);
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Patient registration
patientRouter.post('/register', multer().none(), async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body to debug

    const patientData = removeUndefinedFields({
        fullName: req.body.fullname,
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
        organ_needed: req.body.organ_needed,
        reason: req.body.reason,
        consent: req.body.consent,
        legal_information: req.body.legal_information,
        password: req.body.password // Ensure password is included
    });

    // Validate the password
    if (!validatePassword(patientData.password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.', success: false });
    }

    try {
        console.log('Patient data:', patientData);

        // Ensure the password is not undefined before hashing
        const hashedPassword = await bcrypt.hash(patientData.password, 10);
        patientData.password = hashedPassword;

        const newPatient = new Patient(patientData);
        await newPatient.save();
        console.log('Patient registered successfully');
        res.status(200).json({ message: 'Patient registered successfully', success: true });
    } catch (err) {
        console.error('Error inserting patient:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});


// Find the patient by email
patientRouter.get('/:email', async (req, res) => {
    const email = req.params.email;

    try {
        // Find the patient by email
        const patient = await Patient.findOne({ email });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Return patient information
        res.status(200).json({
            fullName: patient.fullName,
            age: patient.age,
            gender: patient.gender,
            blood_type: patient.blood_type,
            organ_needed: patient.organ_needed,
            matchStatus: patient.matchStatus || 'No match found'
        });
    } catch (err) {
        console.error('Error fetching patient:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Search for a specific patient by aadhar number
patientRouter.post('/search', async (req, res) => {
    try {
        const { aadhar } = req.body; // Get the aadhar number from the request body
        const patient = await Patient.findOne({ aadhar });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        console.error('Error searching patient:', err);
        res.status (500).json({ error: 'Internal server error' });
    }
});


// Export the router
module.exports = patientRouter;

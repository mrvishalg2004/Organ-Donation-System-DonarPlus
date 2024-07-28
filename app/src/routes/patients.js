// const express = require('express');
// const router = express.Router();
// const Patient = require('../models/patient'); // Adjust the path if necessary

// // Route to get all patients
// router.get('/', (req, res) => {
//     Patient.find()
//         .then(patients => res.status(200).json(patients))
//         .catch(err => res.status(500).json({ message: 'Internal server error', error: err.message }));
// });

// // Export the router
// module.exports = router;

const express = require('express');
const router = express.Router();
const Patient = require('../models/patient'); // Adjust the path if necessary

// Route to get all patients
router.get('/', (req, res) => {
    Patient.find()
        .then(patients => res.status(200).json(patients))
        .catch(err => res.status(500).json({ message: 'Internal server error', error: err.message }));
});

// Route to register a new patient
router.post('/register', (req, res) => {
    const newPatient = new Patient({
        fullName: req.body.fullName,
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
        organ_needed: req.body.organ_needed, // Ensure this matches the form field
        reason: req.body.reason,
        consent: req.body.cons,
        legal_information: req.body.legal_information
    });

    newPatient.save()
        .then(() => res.json({ success: true, message: 'Patient registered successfully!' }))
        .catch(err => res.status(500).json({ success: false, message: 'Error registering patient.', error: err.message }));
});

// Export the router
module.exports = router;

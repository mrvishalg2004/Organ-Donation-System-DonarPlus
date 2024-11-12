const express = require('express');
const bcrypt = require('bcrypt');
const hospitalRouter = express.Router();
const multer = require('multer');
const Hospital = require('../models/hospital.model.js');
const crypto = require('crypto');
const User = require('../models/User.model.js');

// Helper function to remove fields with undefined values
function removeUndefinedFields(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    );
}

// Password validation function
function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
}

hospitalRouter.get('/', async (req, res) => {
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


// Hospital registration route
hospitalRouter.post('/register', multer().none(), async (req, res) => {
    const hospitalData = removeUndefinedFields({
        hospitalName: req.body.hospitalName,
        hospitalType: req.body.hospitalType,
        address: req.body.address,
        city: req.body.city,
        password: req.body.password,
        state: req.body.state,
        zipCode: req.body.zipCode,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        registrationNumber: req.body.registrationNumber,
        licenseNumber: req.body.licenseNumber,
        cardiology: req.body.cardiology,
        emergency: req.body.emergency,
        pediatrics: req.body.pediatrics,
        generalMedicine: req.body.generalMedicine,
        emergency247: req.body.emergency247,
        icu: req.body.icu,
        pharmacy: req.body.pharmacy,
        labServices: req.body.labServices,
        totalBeds: req.body.totalBeds,
        ambulance: req.body.ambulance,
        wheelchair: req.body.wheelchair,
        parking: req.body.parking,
        primaryContact: req.body.primaryContact,
        position: req.body.position,
        contactPhone: req.body.contactPhone,
        contactEmail: req.body.contactEmail,
    });

    // Check if password is provided and validate it
    if (!hospitalData.password) {
        return res.status(400).json({ message: 'Password is required.', success: false });
    }

    if (!validatePassword(hospitalData.password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
            success: false,
        });
    }

    try {
        
        console.log('password:', hospitalData.password);
        // Inside hospital registration route
        const hashedPassword = await bcrypt.hash(hospitalData.password, 10);
        // console.log('Hash being saved:', hashedPassword);
        hospitalData.password = hashedPassword;
        // const match = await bcrypt.compare(password, User.password);
        // console.log('Password match result:', match);

        // Save the hospital data
        const newHospital = new Hospital(hospitalData);
        await newHospital.save();
        res.status(200).json({ message: 'Hospital registered successfully', success: true });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});


// Redirect to hospital dashboard HTML page
hospitalRouter.get('/:email', async (req, res) => {
    const email = req.params.email;

    try {
        // Find the hospital by email
        const hospital = await Hospital.findOne({ email });

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        // Redirect to the hospital dashboard page
        res.sendFile(path.join(__dirname, '../public/hosp_dashboard.html'));
    } catch (err) {
        console.error('Error fetching hospital:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// hospitalRouter.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const hospital = await Hospital.findOne({ email });
        
//         if (!hospital) {
//             return res.status(404).json({ error: 'Hospital not found' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, hospital.password);
//         console.log('Password match:', isPasswordValid);
//         if (isPasswordValid) {
//             res.json({ success: true, message: 'Login successful' });
//         } else {
//             res.status(401).json({ error: 'Incorrect password' });
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

module.exports = hospitalRouter;
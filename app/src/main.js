

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: path.join(__dirname, '..', '.env+') });

const app = express();
const port = process.env.PORT || 3005;

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Define Mongoose schemas and models
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
    legal_authorization: String,
    password: {
        type: String,
        required: true
    },
    matchStatus: String  // Add this line if it should exist in the schema
});

const patientSchema = new mongoose.Schema({
    fullName: String,
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
    organ_needed: String,
    reason: String,
    consent: String,
    legal_information: String,
    password: {
        type: String,
        required: true
    }
});

const Donor = mongoose.model('Donor', donorSchema);
const Patient = mongoose.model('Patient', patientSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
const publicPath = path.join(__dirname, '..', 'app', 'dist', 'public');
app.use(express.static(publicPath));

// Utility function to remove undefined fields from an object
const removeUndefinedFields = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
};

// API Routes

// Utility function to validate password strength
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Donor registration
app.post('/api/donor/register', multer().none(), async (req, res) => {
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

// Patient registration
app.post('/api/patient/register', multer().none(), async (req, res) => {
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


// Login route
// Login route
// app.post('/api/login', async (req, res) => {
//     const { email, password, userType } = req.body;

//     try {
//         const model = userType === 'donor' ? Donor : Patient;
//         const user = await model.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const match = await bcrypt.compare(password, user.password);
//         if (match) {
//             res.status(200).json({ message: 'Login successful' });
//         } else {
//             res.status(401).json({ error: 'Invalid credentials' });
//         }
//     } catch (err) {
//         console.error('Error during login:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;  // Extract email, password, and role from the request body

    try {
        let user; // This will store the user based on the role
        
        // Depending on the role, check the Donor or Patient collection
        if (role === 'donor') {
            user = await Donor.findOne({ email }); // Look for user in Donor collection
        } else if (role === 'patient') {
            user = await Patient.findOne({ email }); // Look for user in Patient collection
        } else {
            return res.status(400).json({ error: 'Invalid role selected' });
        }

        // If no user is found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password);
        
        if (match) {
            // Passwords match - Login successful
            return res.status(200).json({ message: 'Login successful', user });
        } else {
            // Passwords don't match
            return res.status(401).json({ error: 'Invalid credentials' });
        }

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch donor info by email or ID (after login)
app.get('/api/donor/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const donor = await Donor.findOne({ email });

        if (!donor) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.status(200).json({
            fullname: donor.fullname,
            age: donor.age,
            gender: donor.gender,
            blood_type: donor.blood_type,
            organ_to_donate: donor.organ_to_donate,
            matchStatus: donor.matchStatus || 'No match found' // Ensure matchStatus is returned
        });
    } catch (err) {
        console.error('Error fetching donor:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/patient/:email', async (req, res) => {
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



// Get all donors
app.get('/api/donors', async (req, res) => {
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

// Search for a specific donor by aadhar number
app.post('/api/donor/search', async (req, res) => {
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

// Get all patients
app.get('/api/patients', async (req, res) => {
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

// Search for a specific patient by aadhar number
app.post('/api/patient/search', async (req, res) => {
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

// Additional routes for other HTML files
app.get('/about', (req, res) => {
    res.sendFile(path.join(publicPath, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(publicPath, 'contact.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/homepage.html`);
});
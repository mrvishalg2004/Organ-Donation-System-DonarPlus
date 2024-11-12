
const express = require('express');
const  authRouter = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Donor = require('../models/donor.model.js');
const Patient = require('../models/patient.model.js');
const Hospital = require('../models/hospital.model.js');
const User = require('../models/User.model.js');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD  // Your email password
    }
});

// Utility function to validate password strength
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Login route
 authRouter.post('/login', async (req, res) => {
    const { email, password, role } = req.body;  // Extract email, password, and role from the request body

    try {
        let user; // This will store the user based on the role
        
        // Depending on the role, check the Donor or Patient collection
        if (role === 'donor') {
            user = await Donor.findOne({ email }); // Look for user in Donor collection
        } else if (role === 'patient') {
            user = await Patient.findOne({ email }); // Look for user in Patient collection
        } else if(role === 'hospital'){
            user = await Hospital.findOne({ email });
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }

        // If no user is found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // console.log('Entered password:', password);
        // console.log('Stored hashed password:', user.password);

        //Compare the provided password with the hashed password in the database
        //const match = user.isPasswordCorrect(password);
        const match = await bcrypt.compare(password, user.password);
        console.log('Password match result:', match);

        
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

// Login route
// authRouter.post('/login', async (req, res) => {
//     const { email, password, role } = req.body;  // Extract email, password, and role from the request body

//     try {
//         let user; // This will store the user based on the role

//         // Depending on the role, check the Donor, Patient, or Hospital collection
//         if (role === 'donor') {
//             user = await Donor.findOne({ email }); // Look for user in Donor collection
//         } else if (role === 'patient') {
//             user = await Patient.findOne({ email }); // Look for user in Patient collection
//         } else if (role === 'hospital') {
//             user = await Hospital.findOne({ email }); // Look for user in Hospital collection
//         } else {
//             return res.status(400).json({ error: 'Invalid role specified' });
//         }

//         // Check if the user was found
//         if (!user) {
//             console.log(`User with email ${email} and role ${role} not found`);
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Check if user has a password field (it should be hashed and stored during registration)
//         if (!user.password) {
//             console.log(`User with email ${email} has no password set`);
//             return res.status(500).json({ error: 'Password not set for user in database' });
//         }

//         // Debugging statements
//         console.log('Entered password:', password);
//         console.log('Stored hashed password:', user.password);

//         // Compare the provided password with the hashed password in the database
//         const match = await bcrypt.compare(password, user.password);
//         console.log('Password match result:', match);

//         if (match) {
//             // Passwords match - Login successful
//             return res.status(200).json({ message: 'Login successful', user });
//         } else {
//             // Passwords don't match
//             console.log('Password mismatch');
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//     } catch (err) {
//         console.error('Error during login:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });



// Forgot Password Route (OTP Generation and Sending)
 authRouter.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

        // Check if the email exists in Donor collection
        let user = await Donor.findOne({ email });

        // If not found in Donor, check Patient collection
        if (!user) {
            user = await Patient.findOne({ email });
        }

        // If not found in Patient, check Hospital collection
        if (!user) {
            user = await Hospital.findOne({ email });
        }

        // If no user is found in any collection
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Store the OTP and its expiration time
        user.otp = otp; // Add otp field
        user.otpExpires = Date.now() + 15 * 60 * 1000; // 10 minutes expiration
        await user.save(); // Save to Donor/Patient model

        // Send the OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log(`OTP sent to ${email}: ${otp}`);
        res.status(200).json({ message: 'OTP sent to your email', success: true });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP', success: false });
    }
});


// authRouter.post('/verify-otp', async (req, res) => {
//     const { email, otp } = req.body;

//     try {
//         let user = await Donor.findOne({ email });

//         // If not found in Donor, check Patient collection
//         if (!user) {
//             user = await Patient.findOne({ email });
//         }

//         // If not found in Patient, check Hospital collection
//         if (!user) {
//             user = await Hospital.findOne({ email });
//         }

//         // If no user is found in any collection
//         if (!user) {
//             console.log('User not found');
//             return res.status(404).json({ message: 'User not found', success: false });
//         }


//         console.log(`Stored OTP: ${user.otp}`);
//         console.log(`Submitted OTP: ${otp}`);
//         console.log(`Current Time: ${Date.now()}`);
//         console.log(`OTP Expiration Time: ${user.otpExpires}`);
//         if (user.otp !== otp) {
//             console.log('Invalid OTP');
//             return res.status(400).json({ message: 'Invalid OTP', success: false });
//         }

//         if (Date.now() > user.otpExpires) {
//             console.log('OTP expired');   
//             return res.status(400).json({ message: 'Expired OTP', success: false });
//         }

//         // Clear the OTP and expiration time
//         user.otp = undefined; 
//         user.otpExpires = undefined; 
//         await user.save();

//         res.status(200).json({ message: 'OTP verified successfully', success: true });
//     } catch (error) {
//         console.error('Error verifying OTP:', error);
//         res.status(500).json({ message: 'Internal server error', success: false });
//     }
// });


authRouter.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Check if the email exists in Donor collection
        let user = await Donor.findOne({ email });

        // If not found in Donor, check Patient collection
        if (!user) {
            user = await Patient.findOne({ email });
        }

        // If not found in Patient, check Hospital collection
        if (!user) {
            user = await Hospital.findOne({ email });
        }

        // If no user is found in any collection
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found', success: false });
        }

        console.log(`Stored OTP: ${user.otp}`);
        console.log(`Submitted OTP: ${otp}`);
        console.log(`Current Time: ${Date.now()}`);
        console.log(`OTP Expiration Time: ${user.otpExpires}`);

        // Validate the OTP
        if (user.otp !== otp) {
            console.log('Invalid OTP');
            return res.status(400).json({ message: 'Invalid OTP', success: false });
        }

        if (Date.now() > user.otpExpires) {
            console.log('OTP expired');
            return res.status(400).json({ message: 'Expired OTP', success: false });
        }

        // Clear the OTP and expiration time
        user.otp = undefined; 
        user.otpExpires = undefined; 
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully', success: true });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

// Password Reset Route
 authRouter.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Check if the email exists in Donor collection
        let user = await Donor.findOne({ email });

        // If not found in Donor, check Patient collection
        if (!user) {
            user = await Patient.findOne({ email });
        }

        if(!user) {
            user = await Hospital.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not ', success: false });
        }

        // Validate the new password (implement your own logic)
        if (!validatePassword(newPassword)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.', success: false });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user password in the database
        user.password = hashedPassword; // Update the password
        await user.save(); // Save the updated user

        res.status(200).json({ message: 'Password reset successfully', success: true });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

module.exports =  authRouter;

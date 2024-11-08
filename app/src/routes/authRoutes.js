
const express = require('express');
const  authRouter = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Donor = require('../models/donor.model.js');
const Patient = require('../models/patient.model.js');

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
        } else {
            return res.status(400).json({ error: 'Invalid role selected' });
        }

        // If no user is found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(user);
        // Compare the provided password with the hashed password in the database
        const match = user.isPasswordCorrect(password);
        
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


// OTP Verification Route
 authRouter.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Check if the email exists in Donor collection
        let user = await Donor.findOne({ email });

        // If not found in Donor, check Patient collection
        if (!user) {
            user = await Patient.findOne({ email });
        }

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

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
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







// const express = require('express');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const User = require('../models/User'); // Adjust path as necessary

// const router = express.Router();

// // OTP Generation and Sending Route
// router.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;    

//     try {
//         // Find user by email    
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });    
//         }

//         // Generate a random OTP
//         const otp = crypto.randomInt(100000, 999999).toString();

//         // Save the OTP in the user record
//         user.otp = otp;
//         await user.save();

//         // Set up the email transporter
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',    
//             auth: {
//                 user: process.env.EMAIL_USER,    
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         // Send the OTP email
//         const mailOptions = {
//             from: process.env.EMAIL_USER,    
//             to: email,
//             subject: 'Your OTP for Password Reset',
//             text: `Your OTP is ${otp}. It is valid for 10 minutes.`
//         };

//         await transporter.sendMail(mailOptions);

//         return res.status(200).json({ message: 'OTP sent to your email.' });
//     } catch (error) {
//         console.error(error);    
//         return res.status(500).json({ message: 'Server error' });
//     }
// });

// // OTP Verification Route
// router.post('/verify-otp', async (req, res) => {
//     const { email, otp } = req.body;    

//     try {
//         const user = await User.findOne({ email });    
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });    
//         }

//         // Check if the OTP is correct
//         if (user.otp !== otp) {
//             return res.status(400).json({ message: 'Invalid OTP' });    
//         }

//         return res.status(200).json({ message: 'OTP verified successfully' });
//     } catch (error) {
//         console.error(error);    
//         return res.status(500).json({ message: 'Server error' });
//     }
// });

// // Password Reset Route
// router.post('/reset-password', async (req, res) => {
//     const { email, newPassword } = req.body;    

//     try {
//         const user = await User.findOne({ email });    
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });    
//         }

//         // Update the password
//         user.password = newPassword; // Hash the password before saving
//         user.otp = undefined; // Clear the OTP
//         await user.save();

//         return res.status(200).json({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error(error);    
//         return res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;

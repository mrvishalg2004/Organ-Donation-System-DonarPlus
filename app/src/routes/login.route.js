const express = require('express');
const loginRouter = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD  // Your email password
    }
});

// Login route
loginRouter.post('/api/login', async (req, res) => {
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
loginRouter.post('/api/forgot-password', async (req, res) => {
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
loginRouter.post('/api/verify-otp', async (req, res) => {
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
loginRouter.post('/api/reset-password', async (req, res) => {
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

module.exports = loginRouter;




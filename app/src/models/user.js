const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

// Create and export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password : String,
    legal_authorization: String,
    otp: { type: String, required: false },
    otpExpires: { type: Date, required: false }

  });

  donorSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10);
    next();
  })
  
  donorSchema.methods.isPasswordCorrect = function(password){
    return bcrypt.compare(password,this.password);
  }
module.exports = mongoose.model('Donor', donorSchema);

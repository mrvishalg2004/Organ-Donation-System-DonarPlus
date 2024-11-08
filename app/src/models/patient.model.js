// const Patient = mongoose.model('Patient', patientSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    organ_needed: String, // Changed to match the HTML name attribute
    reason: String,
    consent: String,
    legal_information: String,
    password : String,
    otp: { type: String },  
  otpExpires: { type: Date }
});

patientSchema.pre("save",async function(next){

  if(!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password,10);
  next();

})

patientSchema.methods.isPasswordCorrect = function(password){
  return bcrypt.compare(password,this.password);
}


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
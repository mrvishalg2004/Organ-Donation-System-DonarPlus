
// const mongoose = require('mongoose');

// const patientSchema = new mongoose.Schema({
//     fullName: String,
//     age: String,
//     gender: String,
//     aadharCardNo: String,
//     phone: String,
//     email: String,
//     address: String,
//     bloodType: String,
//     medicalHistory: String,
//     infectionDiseases: String,
//     surgicalHistory: String,
//     allergies: String,
//     smokingStatus: String,
//     alcoholConsumption: String,
//     drugUse: String,
//     dietExercise: String,
//     organRequired: String,
//     reason: String,
//     consent: String,
//     legalInformation: String
// });


// const Patient = mongoose.model('Patient', patientSchema);
const mongoose = require('mongoose');

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
    organ_required: String, // Changed to match the HTML name attribute
    reason: String,
    consent: String,
    legal_information: String
});

const Patient = mongoose.model('Patient', patientSchema);

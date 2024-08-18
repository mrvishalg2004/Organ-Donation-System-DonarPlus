// const mongoose = require('mongoose');

// const donorSchema = new mongoose.Schema({
//   fullname: { type: String, required: true },
//   age: { type: String, required: true },
//   gender: { type: String, required: true },
//   aadhar: { type: String, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
//   address: { type: String, required: true },
//   blood_type: { type: String, required: true },
//   medical_history: { type: String, required: true },
//   infection_diseases: { type: String, required: true },
//   surgical_history: { type: String, required: true },
//   allergies: { type: String, required: true },
//   smoking_status: { type: String, required: true },
//   alcohol_consumption: { type: String, required: true },
//   drug_use: { type: String, required: true },
//   diet_exercise: { type: String, required: true },
//   organ_to_donate: { type: String, required: true },
//   any_condition: { type: String, required: true },
//   next_of_kin: { type: String, required: true },
//   kin_contact: { type: String, required: true },
//   legal_authorization: { type: String, required: true }
// });

// module.exports = mongoose.model('Donor', donorSchema);


// const mongoose = require('mongoose');

// const donorSchema = new mongoose.Schema({
//     fullname: { type: String, required: true },
//     age: { type: Number, required: true },
//     gender: { type: String, required: true },
//     aadhar: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     address: { type: String, required: true },
//     blood_type: { type: String, required: true },
//     medical_history: { type: String },
//     infection_diseases: { type: String },
//     surgical_history: { type: String },
//     allergies: { type: String },
//     smoking_status: { type: String },
//     alcohol_consumption: { type: String },
//     drug_use: { type: String },
//     diet_exercise: { type: String },
//     organ_to_donate: { type: String, required: true },
//     any_condition: { type: String },
//     next_of_kin: { type: String },
//     kin_contact: { type: String },
//     legal_authorization: { type: String },
//     password: { type: String, required: true }
// }, { timestamps: true });

// const Donor = mongoose.model('Donor', donorSchema);

// module.exports = Donor;

const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    aadhar: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    blood_type: { type: String, required: true },
    medical_history: { type: String },
    infection_diseases: { type: String },
    surgical_history: { type: String },
    allergies: { type: String },
    smoking_status: { type: String },
    alcohol_consumption: { type: String },
    drug_use: { type: String },
    diet_exercise: { type: String },
    organ_to_donate: { type: String, required: true },
    any_condition: { type: String },
    next_of_kin: { type: String },
    kin_contact: { type: String },
    legal_authorization: { type: String },
    password: { type: String, required: true }
}, { timestamps: true });

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;

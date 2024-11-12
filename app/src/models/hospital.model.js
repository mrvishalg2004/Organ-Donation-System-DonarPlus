const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Hospital schema
const hospitalSchema = new mongoose.Schema({
  hospitalName: String,
  hospitalType: String,
  address: String,
  city: String,
  password: String,
  state: String,
  zipCode: String,
  contactNumber:String,
  email: String,
  RegistrationNumber: String,
  licenseNumber: String,
  cardiology: String,
  emergency: String,
  pediatrics: String,
  generalMedicine: String,
  emergency247: String,
  icu: String,
  pharmacy:String,
  labServices:String,
  totalBeds:String,
  ambulance: String,
  wheelchair: String,
  parking: String,
  primaryContact:String,
  position: String,
  contactPhone: String,
  contactEmail: String,
  otp: { type: String, required: false },
    otpExpires: { type: Date, required: false }
});
// Pre-save hook for password hashing
hospitalSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

//Method to check if password is correct
hospitalSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Export the model
module.exports = mongoose.model('Hospital', hospitalSchema);

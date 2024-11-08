/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst path = __webpack_require__(/*! path */ \"path\");\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\nconst publicPath = path.join(__dirname, '..', 'app', 'dist', 'public');\napp.use(express.static(publicPath));\nconst donorRouter = __webpack_require__(/*! ./routes/donor.route.js */ \"./src/routes/donor.route.js\");\nconst patientRouter = __webpack_require__(/*! ./routes/patient.route.js */ \"./src/routes/patient.route.js\");\nconst authRouter = __webpack_require__(/*! ./routes/authRoutes.js */ \"./src/routes/authRoutes.js\");\napp.use('/api/donor', donorRouter);\napp.use('/api/patient', patientRouter);\napp.use('/api', authRouter);\n\n// Additional routes for other HTML files\napp.get('/about', (req, res) => {\n  res.sendFile(path.join(publicPath, 'about.html'));\n});\napp.get('/contact', (req, res) => {\n  res.sendFile(path.join(publicPath, 'contact.html'));\n});\napp.get('*', (req, res) => {\n  res.sendFile(path.join(publicPath, 'index.html'));\n});\nmodule.exports = app;\n\n//# sourceURL=webpack://DonarPlus/./src/app.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst app = __webpack_require__(/*! ./app */ \"./src/app.js\");\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)({\n  path: path.join(__dirname, '..', '.env')\n});\n\n// MongoDB Atlas connection\nmongoose.connect(\"mongodb+srv://vishalsharayu:yq2NL8lieOFlwlZH@donorplusdb.ak122su.mongodb.net/?retryWrites=true&w=majority&appName=Donorplusdb\", {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n}).then(() => {\n  console.log('Connected to MongoDB Atlas');\n  app.on(\"error\", error => {\n    console.error(error);\n  });\n  app.listen(\"3005\" || 0, () => {\n    console.log(`Server running at http://localhost:${\"3005\"}/homepage.html`);\n  });\n}).catch(err => {\n  console.error('Error connecting to MongoDB Atlas:', err);\n});\n\n// // Error handling middleware\n// app.use((err, req, res, next) => {\n//     console.error('Server error:', err);\n//     res.status(500).json({ message: 'Internal server error', error: err.message });\n// });\n\n// Start the server\n\n//# sourceURL=webpack://DonarPlus/./src/main.js?");

/***/ }),

/***/ "./src/models/donor.model.js":
/*!***********************************!*\
  !*** ./src/models/donor.model.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst donorSchema = new mongoose.Schema({\n  fullname: String,\n  age: String,\n  gender: String,\n  aadhar: String,\n  phone: String,\n  email: String,\n  address: String,\n  blood_type: String,\n  medical_history: String,\n  infection_diseases: String,\n  surgical_history: String,\n  allergies: String,\n  smoking_status: String,\n  alcohol_consumption: String,\n  drug_use: String,\n  diet_exercise: String,\n  organ_to_donate: String,\n  any_condition: String,\n  next_of_kin: String,\n  kin_contact: String,\n  password: String,\n  legal_authorization: String\n});\ndonorSchema.pre(\"save\", async function (next) {\n  if (!this.isModified(\"password\")) return next();\n  this.password = bcrypt.hash(this.password, 10);\n  next();\n});\ndonorSchema.methods.isPasswordCorrect = function (password) {\n  return bcrypt.compare(password, this.password);\n};\nmodule.exports = mongoose.model('Donor', donorSchema);\n\n//# sourceURL=webpack://DonarPlus/./src/models/donor.model.js?");

/***/ }),

/***/ "./src/models/patient.model.js":
/*!*************************************!*\
  !*** ./src/models/patient.model.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// const Patient = mongoose.model('Patient', patientSchema);\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst patientSchema = new mongoose.Schema({\n  fullName: String,\n  age: String,\n  gender: String,\n  aadhar: String,\n  phone: String,\n  email: String,\n  address: String,\n  blood_type: String,\n  medical_history: String,\n  infection_diseases: String,\n  surgical_history: String,\n  allergies: String,\n  smoking_status: String,\n  alcohol_consumption: String,\n  drug_use: String,\n  diet_exercise: String,\n  organ_needed: String,\n  // Changed to match the HTML name attribute\n  reason: String,\n  consent: String,\n  legal_information: String,\n  password: String,\n  otp: {\n    type: String\n  },\n  otpExpires: {\n    type: Date\n  }\n});\npatientSchema.pre(\"save\", async function (next) {\n  if (!this.isModified(\"password\")) return next();\n  this.password = bcrypt.hash(this.password, 10);\n  next();\n});\npatientSchema.methods.isPasswordCorrect = function (password) {\n  return bcrypt.compare(password, this.password);\n};\nconst Patient = mongoose.model('Patient', patientSchema);\nmodule.exports = Patient;\n\n//# sourceURL=webpack://DonarPlus/./src/models/patient.model.js?");

/***/ }),

/***/ "./src/routes/authRoutes.js":
/*!**********************************!*\
  !*** ./src/routes/authRoutes.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* provided dependency */ var process = __webpack_require__(/*! process/browser */ \"process/browser\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst authRouter = express.Router();\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nconst Donor = __webpack_require__(/*! ../models/donor.model */ \"./src/models/donor.model.js\");\nconst Patient = __webpack_require__(/*! ../models/patient.model */ \"./src/models/patient.model.js\");\n\n// Create a transporter for sending emails\nconst transporter = nodemailer.createTransport({\n  service: 'gmail',\n  auth: {\n    user: \"2021bcs082@sggs.ac.in\",\n    // Your email address\n    pass: \"zbdt yxnb hlmx nkwi\" // Your email password\n  }\n});\n\n// Utility function to validate password strength\nconst validatePassword = password => {\n  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;\n  return passwordRegex.test(password);\n};\n\n// Login route\nauthRouter.post('/login', async (req, res) => {\n  const {\n    email,\n    password,\n    role\n  } = req.body; // Extract email, password, and role from the request body\n\n  try {\n    let user; // This will store the user based on the role\n\n    // Depending on the role, check the Donor or Patient collection\n    if (role === 'donor') {\n      user = await Donor.findOne({\n        email\n      }); // Look for user in Donor collection\n    } else if (role === 'patient') {\n      user = await Patient.findOne({\n        email\n      }); // Look for user in Patient collection\n    } else {\n      return res.status(400).json({\n        error: 'Invalid role selected'\n      });\n    }\n\n    // If no user is found\n    if (!user) {\n      return res.status(404).json({\n        error: 'User not found'\n      });\n    }\n    console.log(user);\n    // Compare the provided password with the hashed password in the database\n    const match = user.isPasswordCorrect(password);\n    if (match) {\n      // Passwords match - Login successful\n      return res.status(200).json({\n        message: 'Login successful',\n        user\n      });\n    } else {\n      // Passwords don't match\n      return res.status(401).json({\n        error: 'Invalid credentials'\n      });\n    }\n  } catch (err) {\n    console.error('Error during login:', err);\n    return res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Forgot Password Route (OTP Generation and Sending)\nauthRouter.post('/forgot-password', async (req, res) => {\n  const {\n    email\n  } = req.body;\n  try {\n    // Generate OTP\n    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP\n\n    // Check if the email exists in Donor collection\n    let user = await Donor.findOne({\n      email\n    });\n\n    // If not found in Donor, check Patient collection\n    if (!user) {\n      user = await Patient.findOne({\n        email\n      });\n    }\n    if (!user) {\n      return res.status(404).json({\n        message: 'User not found',\n        success: false\n      });\n    }\n\n    // Store the OTP and its expiration time\n    user.otp = otp; // Add otp field\n    user.otpExpires = Date.now() + 15 * 60 * 1000; // 10 minutes expiration\n    await user.save(); // Save to Donor/Patient model\n\n    // Send the OTP via email\n    const mailOptions = {\n      from: process.env.EMAIL_USER,\n      to: email,\n      subject: 'Password Reset OTP',\n      text: `Your OTP for password reset is: ${otp}`\n    };\n\n    // Send email\n    await transporter.sendMail(mailOptions);\n    console.log(`OTP sent to ${email}: ${otp}`);\n    res.status(200).json({\n      message: 'OTP sent to your email',\n      success: true\n    });\n  } catch (error) {\n    console.error('Error sending OTP:', error);\n    res.status(500).json({\n      message: 'Error sending OTP',\n      success: false\n    });\n  }\n});\n\n// OTP Verification Route\nauthRouter.post('/verify-otp', async (req, res) => {\n  const {\n    email,\n    otp\n  } = req.body;\n  try {\n    // Check if the email exists in Donor collection\n    let user = await Donor.findOne({\n      email\n    });\n\n    // If not found in Donor, check Patient collection\n    if (!user) {\n      user = await Patient.findOne({\n        email\n      });\n    }\n    if (!user) {\n      console.log('User not found');\n      return res.status(404).json({\n        message: 'User not found',\n        success: false\n      });\n    }\n    console.log(`Stored OTP: ${user.otp}`);\n    console.log(`Submitted OTP: ${otp}`);\n    console.log(`Current Time: ${Date.now()}`);\n    console.log(`OTP Expiration Time: ${user.otpExpires}`);\n\n    // Validate the OTP\n    if (user.otp !== otp) {\n      console.log('Invalid OTP');\n      return res.status(400).json({\n        message: 'Invalid OTP',\n        success: false\n      });\n    }\n    if (Date.now() > user.otpExpires) {\n      console.log('OTP expired');\n      return res.status(400).json({\n        message: 'Expired OTP',\n        success: false\n      });\n    }\n\n    // Clear the OTP and expiration time\n    user.otp = undefined;\n    user.otpExpires = undefined;\n    await user.save();\n    res.status(200).json({\n      message: 'OTP verified successfully',\n      success: true\n    });\n  } catch (error) {\n    console.error('Error verifying OTP:', error);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\n\n// Password Reset Route\nauthRouter.post('/reset-password', async (req, res) => {\n  const {\n    email,\n    newPassword\n  } = req.body;\n  try {\n    // Check if the email exists in Donor collection\n    let user = await Donor.findOne({\n      email\n    });\n\n    // If not found in Donor, check Patient collection\n    if (!user) {\n      user = await Patient.findOne({\n        email\n      });\n    }\n    if (!user) {\n      return res.status(404).json({\n        message: 'User not found',\n        success: false\n      });\n    }\n\n    // Validate the new password (implement your own logic)\n    if (!validatePassword(newPassword)) {\n      return res.status(400).json({\n        message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',\n        success: false\n      });\n    }\n\n    // Hash the new password\n    const hashedPassword = await bcrypt.hash(newPassword, 10);\n\n    // Update the user password in the database\n    user.password = hashedPassword; // Update the password\n    await user.save(); // Save the updated user\n\n    res.status(200).json({\n      message: 'Password reset successfully',\n      success: true\n    });\n  } catch (error) {\n    console.error('Error resetting password:', error);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\nmodule.exports = authRouter;\n\n// const express = require('express');\n// const nodemailer = require('nodemailer');\n// const crypto = require('crypto');\n// const User = require('../models/User'); // Adjust path as necessary\n\n// const router = express.Router();\n\n// // OTP Generation and Sending Route\n// router.post('/forgot-password', async (req, res) => {\n//     const { email } = req.body;    \n\n//     try {\n//         // Find user by email    \n//         const user = await User.findOne({ email });\n//         if (!user) {\n//             return res.status(404).json({ message: 'User not found' });    \n//         }\n\n//         // Generate a random OTP\n//         const otp = crypto.randomInt(100000, 999999).toString();\n\n//         // Save the OTP in the user record\n//         user.otp = otp;\n//         await user.save();\n\n//         // Set up the email transporter\n//         const transporter = nodemailer.createTransport({\n//             service: 'gmail',    \n//             auth: {\n//                 user: process.env.EMAIL_USER,    \n//                 pass: process.env.EMAIL_PASS\n//             }\n//         });\n\n//         // Send the OTP email\n//         const mailOptions = {\n//             from: process.env.EMAIL_USER,    \n//             to: email,\n//             subject: 'Your OTP for Password Reset',\n//             text: `Your OTP is ${otp}. It is valid for 10 minutes.`\n//         };\n\n//         await transporter.sendMail(mailOptions);\n\n//         return res.status(200).json({ message: 'OTP sent to your email.' });\n//     } catch (error) {\n//         console.error(error);    \n//         return res.status(500).json({ message: 'Server error' });\n//     }\n// });\n\n// // OTP Verification Route\n// router.post('/verify-otp', async (req, res) => {\n//     const { email, otp } = req.body;    \n\n//     try {\n//         const user = await User.findOne({ email });    \n//         if (!user) {\n//             return res.status(404).json({ message: 'User not found' });    \n//         }\n\n//         // Check if the OTP is correct\n//         if (user.otp !== otp) {\n//             return res.status(400).json({ message: 'Invalid OTP' });    \n//         }\n\n//         return res.status(200).json({ message: 'OTP verified successfully' });\n//     } catch (error) {\n//         console.error(error);    \n//         return res.status(500).json({ message: 'Server error' });\n//     }\n// });\n\n// // Password Reset Route\n// router.post('/reset-password', async (req, res) => {\n//     const { email, newPassword } = req.body;    \n\n//     try {\n//         const user = await User.findOne({ email });    \n//         if (!user) {\n//             return res.status(404).json({ message: 'User not found' });    \n//         }\n\n//         // Update the password\n//         user.password = newPassword; // Hash the password before saving\n//         user.otp = undefined; // Clear the OTP\n//         await user.save();\n\n//         return res.status(200).json({ message: 'Password reset successfully' });\n//     } catch (error) {\n//         console.error(error);    \n//         return res.status(500).json({ message: 'Server error' });\n//     }\n// });\n\n// module.exports = router;\n\n//# sourceURL=webpack://DonarPlus/./src/routes/authRoutes.js?");

/***/ }),

/***/ "./src/routes/donor.route.js":
/*!***********************************!*\
  !*** ./src/routes/donor.route.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst donorRouter = express.Router();\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Donor = __webpack_require__(/*! ../models/donor.model.js */ \"./src/models/donor.model.js\");\nconst multer = __webpack_require__(/*! multer */ \"multer\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\n// Utility function to remove undefined fields from an object\nconst removeUndefinedFields = obj => {\n  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));\n};\n\n// Utility function to validate password strength\nconst validatePassword = password => {\n  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;\n  return passwordRegex.test(password);\n};\n\n// Get all donors\ndonorRouter.get('/', async (req, res) => {\n  try {\n    const donors = await Donor.find();\n    if (donors.length === 0) {\n      return res.status(404).json({\n        message: 'No donors found'\n      });\n    }\n    res.json(donors);\n  } catch (err) {\n    console.error('Error fetching donors:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      error: err.message\n    });\n  }\n});\n\n// Donor registration\ndonorRouter.post('/register', multer().none(), async (req, res) => {\n  const donorData = removeUndefinedFields({\n    fullname: req.body.fullname,\n    age: req.body.age,\n    gender: req.body.gender,\n    aadhar: req.body.aadhar,\n    phone: req.body.phone,\n    email: req.body.email,\n    address: req.body.address,\n    blood_type: req.body.blood_type,\n    medical_history: req.body.medical_history,\n    infection_diseases: req.body.infection_diseases,\n    surgical_history: req.body.surgical_history,\n    allergies: req.body.allergies,\n    smoking_status: req.body.smoking_status,\n    alcohol_consumption: req.body.alcohol_consumption,\n    drug_use: req.body.drug_use,\n    diet_exercise: req.body.diet_exercise,\n    organ_to_donate: req.body.organ_to_donate,\n    any_condition: req.body.any_condition,\n    next_of_kin: req.body.next_of_kin,\n    kin_contact: req.body.kin_contact,\n    legal_authorization: req.body.legal_authorization,\n    password: req.body.password // Ensure password is included\n  });\n\n  // Validate the password\n  if (!validatePassword(donorData.password)) {\n    return res.status(400).json({\n      message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',\n      success: false\n    });\n  }\n  try {\n    console.log('Donor data:', donorData);\n    const hashedPassword = await bcrypt.hash(donorData.password, 10);\n    donorData.password = hashedPassword;\n    const newDonor = new Donor(donorData);\n    await newDonor.save();\n    console.log('Donor registered successfully');\n    res.status(200).json({\n      message: 'Donor registered successfully',\n      success: true\n    });\n  } catch (err) {\n    console.error('Error inserting donor:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\n\n// Search for a specific donor by aadhar number\ndonorRouter.post('/search', async (req, res) => {\n  try {\n    const {\n      aadhar\n    } = req.body; // Get the aadhar number from the request body\n    const donor = await Donor.findOne({\n      aadhar\n    });\n    if (!donor) {\n      return res.status(404).json({\n        error: 'Donor not found'\n      });\n    }\n    res.json(donor);\n  } catch (err) {\n    console.error('Error searching donor:', err);\n    res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Fetch donor info by email or ID (after login)\ndonorRouter.get('/:email', async (req, res) => {\n  const email = req.params.email;\n  try {\n    const donor = await Donor.findOne({\n      email\n    });\n    if (!donor) {\n      return res.status(404).json({\n        message: 'Donor not found'\n      });\n    }\n    return res.status(200).json(donor);\n  } catch (err) {\n    console.error('Error fetching donor:', err);\n    return res.status(500).json({\n      message: 'Internal server error'\n    });\n  }\n});\nmodule.exports = donorRouter;\n\n//# sourceURL=webpack://DonarPlus/./src/routes/donor.route.js?");

/***/ }),

/***/ "./src/routes/patient.route.js":
/*!*************************************!*\
  !*** ./src/routes/patient.route.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst patientRouter = express.Router();\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Patient = __webpack_require__(/*! ../models/patient.model.js */ \"./src/models/patient.model.js\"); // Adjust the path if necessary\nconst multer = __webpack_require__(/*! multer */ \"multer\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\n// Utility function to remove undefined fields from an object\nconst removeUndefinedFields = obj => {\n  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));\n};\n\n// Utility function to validate password strength\nconst validatePassword = password => {\n  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;\n  return passwordRegex.test(password);\n};\n\n// Get all patients\npatientRouter.get('/', async (req, res) => {\n  try {\n    const patients = await Patient.find();\n    if (patients.length === 0) {\n      return res.status(404).json({\n        message: 'No patients found'\n      });\n    }\n    res.status(200).json(patients);\n  } catch (err) {\n    console.error('Error fetching patients:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      error: err.message\n    });\n  }\n});\n\n// Patient registration\npatientRouter.post('/register', multer().none(), async (req, res) => {\n  console.log('Request Body:', req.body); // Log the request body to debug\n\n  const patientData = removeUndefinedFields({\n    fullName: req.body.fullname,\n    age: req.body.age,\n    gender: req.body.gender,\n    aadhar: req.body.aadhar,\n    phone: req.body.phone,\n    email: req.body.email,\n    address: req.body.address,\n    blood_type: req.body.blood_type,\n    medical_history: req.body.medical_history,\n    infection_diseases: req.body.infection_diseases,\n    surgical_history: req.body.surgical_history,\n    allergies: req.body.allergies,\n    smoking_status: req.body.smoking_status,\n    alcohol_consumption: req.body.alcohol_consumption,\n    drug_use: req.body.drug_use,\n    diet_exercise: req.body.diet_exercise,\n    organ_needed: req.body.organ_needed,\n    reason: req.body.reason,\n    consent: req.body.consent,\n    legal_information: req.body.legal_information,\n    password: req.body.password // Ensure password is included\n  });\n\n  // Validate the password\n  if (!validatePassword(patientData.password)) {\n    return res.status(400).json({\n      message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',\n      success: false\n    });\n  }\n  try {\n    console.log('Patient data:', patientData);\n\n    // Ensure the password is not undefined before hashing\n    const hashedPassword = await bcrypt.hash(patientData.password, 10);\n    patientData.password = hashedPassword;\n    const newPatient = new Patient(patientData);\n    await newPatient.save();\n    console.log('Patient registered successfully');\n    res.status(200).json({\n      message: 'Patient registered successfully',\n      success: true\n    });\n  } catch (err) {\n    console.error('Error inserting patient:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\n\n// Find the patient by email\npatientRouter.get('/:email', async (req, res) => {\n  const email = req.params.email;\n  try {\n    // Find the patient by email\n    const patient = await Patient.findOne({\n      email\n    });\n    if (!patient) {\n      return res.status(404).json({\n        error: 'Patient not found'\n      });\n    }\n\n    // Return patient information\n    res.status(200).json({\n      fullName: patient.fullName,\n      age: patient.age,\n      gender: patient.gender,\n      blood_type: patient.blood_type,\n      organ_needed: patient.organ_needed,\n      matchStatus: patient.matchStatus || 'No match found'\n    });\n  } catch (err) {\n    console.error('Error fetching patient:', err);\n    res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Search for a specific patient by aadhar number\npatientRouter.post('/search', async (req, res) => {\n  try {\n    const {\n      aadhar\n    } = req.body; // Get the aadhar number from the request body\n    const patient = await Patient.findOne({\n      aadhar\n    });\n    if (!patient) {\n      return res.status(404).json({\n        error: 'Patient not found'\n      });\n    }\n    res.json(patient);\n  } catch (err) {\n    console.error('Error searching patient:', err);\n    res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Export the router\nmodule.exports = patientRouter;\n\n//# sourceURL=webpack://DonarPlus/./src/routes/patient.route.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("multer");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("nodemailer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process/browser":
/*!**********************************!*\
  !*** external "process/browser" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("process/browser");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
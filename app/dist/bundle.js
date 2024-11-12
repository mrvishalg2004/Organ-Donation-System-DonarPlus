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

eval("// const express = require('express');\n// const app = express();\n// const bodyParser = require('body-parser');\n// const path = require('path');\n\n// app.use(bodyParser.urlencoded({ extended: false }));\n// app.use(bodyParser.json());\n\n// const publicPath = path.join(__dirname, '..', 'app', 'dist', 'public');\n// app.use(express.static(publicPath));\n\n// const donorRouter = require('./routes/donor.route.js');\n// const patientRouter = require('./routes/patient.route.js');\n// const authRouter = require('./routes/authRoutes.js')\n\n// app.use('/api/donor',donorRouter);\n// app.use('/api/patient',patientRouter);\n// app.use('/api',authRouter);\n\n// // Additional routes for other HTML files\n// app.get('/about', (req, res) => {\n//     res.sendFile(path.join(publicPath, 'about.html'));\n// });\n\n// app.get('/contact', (req, res) => {\n//     res.sendFile(path.join(publicPath, 'contact.html'));\n// });\n\n// app.get('*', (req, res) => {\n//     res.sendFile(path.join(publicPath, 'index.html'));\n// });\n\n// module.exports = app;\n\nconst express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst path = __webpack_require__(/*! path */ \"path\");\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\nconst publicPath = path.join(__dirname, '..', 'app', 'dist', 'public');\napp.use(express.static(publicPath));\n\n// Import Routes\nconst donorRouter = __webpack_require__(/*! ./routes/donor.route.js */ \"./src/routes/donor.route.js\");\nconst patientRouter = __webpack_require__(/*! ./routes/patient.route.js */ \"./src/routes/patient.route.js\");\nconst authRouter = __webpack_require__(/*! ./routes/authRoutes.js */ \"./src/routes/authRoutes.js\");\nconst hospitalRouter = __webpack_require__(/*! ./routes/hospital.route.js */ \"./src/routes/hospital.route.js\"); // Add this line\nconst userRoutes = __webpack_require__(/*! ./routes/User.routes.js */ \"./src/routes/User.routes.js\");\n//const loginRoute = require('./routes/login.route.js');\n\n// Use Routes\napp.use('/api/donor', donorRouter);\napp.use('/api/patient', patientRouter);\napp.use('/api', authRouter);\napp.use('/api/hospital', hospitalRouter); // Add this line\napp.use('/api', userRoutes);\n//app.use('/api', loginRoute);\n\n// Additional routes for other HTML files\napp.get('/about', (req, res) => {\n  res.sendFile(path.join(publicPath, 'about.html'));\n});\napp.get('/contact', (req, res) => {\n  res.sendFile(path.join(publicPath, 'contact.html'));\n});\n\n// Catch-all route for Single Page Application\napp.get('*', (req, res) => {\n  res.sendFile(path.join(publicPath, 'index.html'));\n});\nmodule.exports = app;\n\n//# sourceURL=webpack://DonarPlus/./src/app.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst app = __webpack_require__(/*! ./app */ \"./src/app.js\");\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)({\n  path: path.join(__dirname, '..', '.env')\n});\n\n// MongoDB Atlas connection\nmongoose.connect(\"mongodb+srv://vishalsharayu:yq2NL8lieOFlwlZH@donorplusdb.ak122su.mongodb.net/?retryWrites=true&w=majority&appName=Donorplusdb\", {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n}).then(() => {\n  console.log('Connected to MongoDB Atlas');\n  app.on(\"error\", error => {\n    console.error(error);\n  });\n  app.listen(\"3005\" || 0, () => {\n    console.log(`Server running at http://localhost:${\"3005\"}/homepage.html`);\n  });\n}).catch(err => {\n  console.error('Error connecting to MongoDB Atlas:', err);\n});\n\n// // Error handling middleware\n// app.use((err, req, res, next) => {\n//     console.error('Server error:', err);\n//     res.status(500).json({ message: 'Internal server error', error: err.message });\n// });\n\n// Start the server\n\n//# sourceURL=webpack://DonarPlus/./src/main.js?");

/***/ }),

/***/ "./src/middleware/auth.js":
/*!********************************!*\
  !*** ./src/middleware/auth.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"); // Ensure jsonwebtoken is installed\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)(); // Load environment variables\n\nconst authMiddleware = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1]; // Expect \"Bearer <token>\"\n\n  if (!token) {\n    return res.status(401).json({\n      error: 'Unauthorized: No token provided'\n    });\n  }\n  try {\n    const decoded = jwt.verify(token, \"5afb4fcece56148503ed1428f77f70002c55490077a5ca81ec2c559f9f5113daae58ff1a6ff6423e7785aea70f1f1a513ce27e2f72dce7e18208905f049a2f26\");\n    req.user = decoded; // Attach decoded user info to request for access in routes\n    next();\n  } catch (error) {\n    return res.status(401).json({\n      error: 'Unauthorized: Invalid token'\n    });\n  }\n};\nmodule.exports = authMiddleware;\n\n//# sourceURL=webpack://DonarPlus/./src/middleware/auth.js?");

/***/ }),

/***/ "./src/models/User.model.js":
/*!**********************************!*\
  !*** ./src/models/User.model.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst userSchema = new mongoose.Schema({\n  email: {\n    type: String,\n    required: true\n  },\n  password: {\n    type: String,\n    required: true\n  },\n  otp: {\n    type: String\n  },\n  otpExpires: {\n    type: Date\n  }\n});\nmodule.exports = mongoose.model('User', userSchema);\n\n//# sourceURL=webpack://DonarPlus/./src/models/User.model.js?");

/***/ }),

/***/ "./src/models/donor.model.js":
/*!***********************************!*\
  !*** ./src/models/donor.model.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst donorSchema = new mongoose.Schema({\n  fullname: String,\n  age: String,\n  gender: String,\n  aadhar: String,\n  phone: String,\n  email: String,\n  address: String,\n  blood_type: String,\n  medical_history: String,\n  infection_diseases: String,\n  surgical_history: String,\n  allergies: String,\n  smoking_status: String,\n  alcohol_consumption: String,\n  drug_use: String,\n  diet_exercise: String,\n  organ_to_donate: String,\n  any_condition: String,\n  next_of_kin: String,\n  kin_contact: String,\n  password: String,\n  legal_authorization: String,\n  otp: {\n    type: String,\n    required: false\n  },\n  otpExpires: {\n    type: Date,\n    required: false\n  }\n});\ndonorSchema.pre(\"save\", async function (next) {\n  if (!this.isModified(\"password\")) return next();\n  this.password = bcrypt.hash(this.password, 10);\n  next();\n});\ndonorSchema.methods.isPasswordCorrect = function (password) {\n  return bcrypt.compare(password, this.password);\n};\nmodule.exports = mongoose.model('Donor', donorSchema);\n\n//# sourceURL=webpack://DonarPlus/./src/models/donor.model.js?");

/***/ }),

/***/ "./src/models/hospital.model.js":
/*!**************************************!*\
  !*** ./src/models/hospital.model.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\n// Define the Hospital schema\nconst hospitalSchema = new mongoose.Schema({\n  hospitalName: String,\n  hospitalType: String,\n  address: String,\n  city: String,\n  password: String,\n  state: String,\n  zipCode: String,\n  contactNumber: String,\n  email: String,\n  RegistrationNumber: String,\n  licenseNumber: String,\n  cardiology: String,\n  emergency: String,\n  pediatrics: String,\n  generalMedicine: String,\n  emergency247: String,\n  icu: String,\n  pharmacy: String,\n  labServices: String,\n  totalBeds: String,\n  ambulance: String,\n  wheelchair: String,\n  parking: String,\n  primaryContact: String,\n  position: String,\n  contactPhone: String,\n  contactEmail: String,\n  otp: {\n    type: String,\n    required: false\n  },\n  otpExpires: {\n    type: Date,\n    required: false\n  }\n});\n// Pre-save hook for password hashing\nhospitalSchema.pre(\"save\", async function (next) {\n  if (!this.isModified(\"password\")) return next();\n  this.password = bcrypt.hash(this.password, 10);\n  next();\n});\n\n//Method to check if password is correct\nhospitalSchema.methods.isPasswordCorrect = async function (password) {\n  return bcrypt.compare(password, this.password);\n};\n\n// Export the model\nmodule.exports = mongoose.model('Hospital', hospitalSchema);\n\n//# sourceURL=webpack://DonarPlus/./src/models/hospital.model.js?");

/***/ }),

/***/ "./src/models/patient.model.js":
/*!*************************************!*\
  !*** ./src/models/patient.model.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// const Patient = mongoose.model('Patient', patientSchema);\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst patientSchema = new mongoose.Schema({\n  fullName: String,\n  age: String,\n  gender: String,\n  aadhar: String,\n  phone: String,\n  email: String,\n  address: String,\n  blood_type: String,\n  medical_history: String,\n  infection_diseases: String,\n  surgical_history: String,\n  allergies: String,\n  smoking_status: String,\n  alcohol_consumption: String,\n  drug_use: String,\n  diet_exercise: String,\n  organ_needed: String,\n  // Changed to match the HTML name attribute\n  reason: String,\n  consent: String,\n  legal_information: String,\n  password: String,\n  otp: {\n    type: String\n  },\n  otpExpires: {\n    type: Date\n  }\n});\npatientSchema.pre(\"save\", async function (next) {\n  if (!this.isModified(\"password\")) return next();\n  this.password = bcrypt.hash(this.password, 10);\n  next();\n});\npatientSchema.methods.isPasswordCorrect = function (password) {\n  return bcrypt.compare(password, this.password);\n};\nconst Patient = mongoose.model('Patient', patientSchema);\nmodule.exports = Patient;\n\n//# sourceURL=webpack://DonarPlus/./src/models/patient.model.js?");

/***/ }),

/***/ "./src/routes/User.routes.js":
/*!***********************************!*\
  !*** ./src/routes/User.routes.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// // src/routes/user.routes.js\n// const express = require('express');\n// const router = express.Router();\n// const User = require('../models/User.model.js');\n// const authMiddleware = require('../middleware/auth.js'); // Import auth middleware\n\n// // Check user type and redirect based on login type\n// router.get('/userType', authMiddleware, async (req, res) => {\n//     try {\n//         const email = req.user.email; // Get email from the decoded token\n\n//         // Find user by email in the database\n//         const user = await User.findOne({ email });\n\n//         if (user) {\n//             // Redirect based on userType\n//             if (user.userType === 'hospital') {\n//                 res.json({ redirect: 'hosp_dashboard.html' });\n//             } else if (user.userType === 'donor') {\n//                 res.json({ redirect: 'donor-dashboard.html' });\n//             } else if (user.userType === 'patient') {\n//                 res.json({ redirect: 'patient-dashboard.html' });\n//             }\n//         } else {\n//             res.status(404).json({ error: 'User not found' });\n//         }\n//     } catch (error) {\n//         console.error(\"Error fetching user type:\", error);\n//         res.status(500).json({ error: 'Internal server error' });\n//     }\n// });\n\n// module.exports = router;\n\nconst express = __webpack_require__(/*! express */ \"express\");\nconst userRouter = express.Router();\nconst User = __webpack_require__(/*! ../models/User.model */ \"./src/models/User.model.js\");\n// const otp = require('../models/otp.model');\nconst authMiddleware = __webpack_require__(/*! ../middleware/auth */ \"./src/middleware/auth.js\"); // Import the middleware\n\n// Endpoint to get user type, protected by authMiddleware\nuserRouter.get('/api/userType', authMiddleware, async (req, res) => {\n  const email = req.user.email; // Now accessible from decoded token\n  try {\n    const user = await User.findOne({\n      email\n    });\n    if (user) {\n      res.json({\n        userType: user.userType\n      });\n    } else {\n      res.status(404).json({\n        error: 'User not found'\n      });\n    }\n  } catch (error) {\n    res.status(500).json({\n      error: 'Server error'\n    });\n  }\n});\nmodule.exports = userRouter;\n\n//# sourceURL=webpack://DonarPlus/./src/routes/User.routes.js?");

/***/ }),

/***/ "./src/routes/authRoutes.js":
/*!**********************************!*\
  !*** ./src/routes/authRoutes.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* provided dependency */ var process = __webpack_require__(/*! process/browser */ \"process/browser\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst authRouter = express.Router();\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nconst Donor = __webpack_require__(/*! ../models/donor.model.js */ \"./src/models/donor.model.js\");\nconst Patient = __webpack_require__(/*! ../models/patient.model.js */ \"./src/models/patient.model.js\");\nconst Hospital = __webpack_require__(/*! ../models/hospital.model.js */ \"./src/models/hospital.model.js\");\nconst User = __webpack_require__(/*! ../models/User.model.js */ \"./src/models/User.model.js\");\n\n// Create a transporter for sending emails\nconst transporter = nodemailer.createTransport({\n  service: 'gmail',\n  auth: {\n    user: \"2021bcs082@sggs.ac.in\",\n    // Your email address\n    pass: \"zbdt yxnb hlmx nkwi\" // Your email password\n  }\n});\n\n// Utility function to validate password strength\nconst validatePassword = password => {\n  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;\n  return passwordRegex.test(password);\n};\n\n// Login route\nauthRouter.post('/login', async (req, res) => {\n  const {\n    email,\n    password,\n    role\n  } = req.body; // Extract email, password, and role from the request body\n\n  try {\n    let user; // This will store the user based on the role\n\n    // Depending on the role, check the Donor or Patient collection\n    if (role === 'donor') {\n      user = await Donor.findOne({\n        email\n      }); // Look for user in Donor collection\n    } else if (role === 'patient') {\n      user = await Patient.findOne({\n        email\n      }); // Look for user in Patient collection\n    } else if (role === 'hospital') {\n      user = await Hospital.findOne({\n        email\n      });\n    } else {\n      return res.status(400).json({\n        error: 'Invalid role'\n      });\n    }\n\n    // If no user is found\n    if (!user) {\n      return res.status(404).json({\n        error: 'User not found'\n      });\n    }\n\n    // console.log('Entered password:', password);\n    // console.log('Stored hashed password:', user.password);\n\n    //Compare the provided password with the hashed password in the database\n    //const match = user.isPasswordCorrect(password);\n    const match = await bcrypt.compare(password, user.password);\n    console.log('Password match result:', match);\n    if (match) {\n      // Passwords match - Login successful\n      return res.status(200).json({\n        message: 'Login successful',\n        user\n      });\n    } else {\n      // Passwords don't match\n      return res.status(401).json({\n        error: 'Invalid credentials'\n      });\n    }\n  } catch (err) {\n    console.error('Error during login:', err);\n    return res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Login route\n// authRouter.post('/login', async (req, res) => {\n//     const { email, password, role } = req.body;  // Extract email, password, and role from the request body\n\n//     try {\n//         let user; // This will store the user based on the role\n\n//         // Depending on the role, check the Donor, Patient, or Hospital collection\n//         if (role === 'donor') {\n//             user = await Donor.findOne({ email }); // Look for user in Donor collection\n//         } else if (role === 'patient') {\n//             user = await Patient.findOne({ email }); // Look for user in Patient collection\n//         } else if (role === 'hospital') {\n//             user = await Hospital.findOne({ email }); // Look for user in Hospital collection\n//         } else {\n//             return res.status(400).json({ error: 'Invalid role specified' });\n//         }\n\n//         // Check if the user was found\n//         if (!user) {\n//             console.log(`User with email ${email} and role ${role} not found`);\n//             return res.status(404).json({ error: 'User not found' });\n//         }\n\n//         // Check if user has a password field (it should be hashed and stored during registration)\n//         if (!user.password) {\n//             console.log(`User with email ${email} has no password set`);\n//             return res.status(500).json({ error: 'Password not set for user in database' });\n//         }\n\n//         // Debugging statements\n//         console.log('Entered password:', password);\n//         console.log('Stored hashed password:', user.password);\n\n//         // Compare the provided password with the hashed password in the database\n//         const match = await bcrypt.compare(password, user.password);\n//         console.log('Password match result:', match);\n\n//         if (match) {\n//             // Passwords match - Login successful\n//             return res.status(200).json({ message: 'Login successful', user });\n//         } else {\n//             // Passwords don't match\n//             console.log('Password mismatch');\n//             return res.status(401).json({ error: 'Invalid credentials' });\n//         }\n\n//     } catch (err) {\n//         console.error('Error during login:', err);\n//         return res.status(500).json({ error: 'Internal server error' });\n//     }\n// });\n\n// Forgot Password Route (OTP Generation and Sending)\nauthRouter.post('/forgot-password', async (req, res) => {\n  const {\n    email\n  } = req.body;\n  try {\n    // Generate OTP\n    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP\n\n    // Check if the email exists in Donor collection\n    let user = await Donor.findOne({\n      email\n    });\n\n    // If not found in Donor, check Patient collection\n    if (!user) {\n      user = await Patient.findOne({\n        email\n      });\n    }\n\n    // If not found in Patient, check Hospital collection\n    if (!user) {\n      user = await Hospital.findOne({\n        email\n      });\n    }\n\n    // If no user is found in any collection\n    if (!user) {\n      return res.status(404).json({\n        message: 'User not found',\n        success: false\n      });\n    }\n\n    // Store the OTP and its expiration time\n    user.otp = otp; // Add otp field\n    user.otpExpires = Date.now() + 15 * 60 * 1000; // 10 minutes expiration\n    await user.save(); // Save to Donor/Patient model\n\n    // Send the OTP via email\n    const mailOptions = {\n      from: process.env.EMAIL_USER,\n      to: email,\n      subject: 'Password Reset OTP',\n      text: `Your OTP for password reset is: ${otp}`\n    };\n\n    // Send email\n    await transporter.sendMail(mailOptions);\n    console.log(`OTP sent to ${email}: ${otp}`);\n    res.status(200).json({\n      message: 'OTP sent to your email',\n      success: true\n    });\n  } catch (error) {\n    console.error('Error sending OTP:', error);\n    res.status(500).json({\n      message: 'Error sending OTP',\n      success: false\n    });\n  }\n});\n\n// authRouter.post('/verify-otp', async (req, res) => {\n//     const { email, otp } = req.body;\n\n//     try {\n//         let user = await Donor.findOne({ email });\n\n//         // If not found in Donor, check Patient collection\n//         if (!user) {\n//             user = await Patient.findOne({ email });\n//         }\n\n//         // If not found in Patient, check Hospital collection\n//         if (!user) {\n//             user = await Hospital.findOne({ email });\n//         }\n\n//         // If no user is found in any collection\n//         if (!user) {\n//             console.log('User not found');\n//             return res.status(404).json({ message: 'User not found', success: false });\n//         }\n\n//         console.log(`Stored OTP: ${user.otp}`);\n//         console.log(`Submitted OTP: ${otp}`);\n//         console.log(`Current Time: ${Date.now()}`);\n//         console.log(`OTP Expiration Time: ${user.otpExpires}`);\n//         if (user.otp !== otp) {\n//             console.log('Invalid OTP');\n//             return res.status(400).json({ message: 'Invalid OTP', success: false });\n//         }\n\n//         if (Date.now() > user.otpExpires) {\n//             console.log('OTP expired');   \n//             return res.status(400).json({ message: 'Expired OTP', success: false });\n//         }\n\n//         // Clear the OTP and expiration time\n//         user.otp = undefined; \n//         user.otpExpires = undefined; \n//         await user.save();\n\n//         res.status(200).json({ message: 'OTP verified successfully', success: true });\n//     } catch (error) {\n//         console.error('Error verifying OTP:', error);\n//         res.status(500).json({ message: 'Internal server error', success: false });\n//     }\n// });\n\nauthRouter.post('/verify-otp', async (req, res) => {\n  const {\n    email,\n    otp\n  } = req.body;\n  try {\n    // Check if the email exists in Donor collection\n    let user = await Donor.findOne({\n      email\n    });\n\n    // If not found in Donor, check Patient collection\n    if (!user) {\n      user = await Patient.findOne({\n        email\n      });\n    }\n\n    // If not found in Patient, check Hospital collection\n    if (!user) {\n      user = await Hospital.findOne({\n        email\n      });\n    }\n\n    // If no user is found in any collection\n    if (!user) {\n      console.log('User not found');\n      return res.status(404).json({\n        message: 'User not found',\n        success: false\n      });\n    }\n    console.log(`Stored OTP: ${user.otp}`);\n    console.log(`Submitted OTP: ${otp}`);\n    console.log(`Current Time: ${Date.now()}`);\n    console.log(`OTP Expiration Time: ${user.otpExpires}`);\n\n    // Validate the OTP\n    if (user.otp !== otp) {\n      console.log('Invalid OTP');\n      return res.status(400).json({\n        message: 'Invalid OTP',\n        success: false\n      });\n    }\n    if (Date.now() > user.otpExpires) {\n      console.log('OTP expired');\n      return res.status(400).json({\n        message: 'Expired OTP',\n        success: false\n      });\n    }\n\n    // Clear the OTP and expiration time\n    user.otp = undefined;\n    user.otpExpires = undefined;\n    await user.save();\n    res.status(200).json({\n      message: 'OTP verified successfully',\n      success: true\n    });\n  } catch (error) {\n    console.error('Error verifying OTP:', error);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\n\n// Password Reset Route\nauthRouter.post('/reset-password', async (req, res) => {\n  const {\n    email,\n    newPassword\n  } = req.body;\n  try {\n    // Check if the email exists in Donor collection\n    let user = await Donor.findOne({\n      email\n    });\n\n    // If not found in Donor, check Patient collection\n    if (!user) {\n      user = await Patient.findOne({\n        email\n      });\n    }\n    if (!user) {\n      user = await Hospital.findOne({\n        email\n      });\n    }\n    if (!user) {\n      return res.status(404).json({\n        message: 'User not ',\n        success: false\n      });\n    }\n\n    // Validate the new password (implement your own logic)\n    if (!validatePassword(newPassword)) {\n      return res.status(400).json({\n        message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',\n        success: false\n      });\n    }\n\n    // Hash the new password\n    const hashedPassword = await bcrypt.hash(newPassword, 10);\n\n    // Update the user password in the database\n    user.password = hashedPassword; // Update the password\n    await user.save(); // Save the updated user\n\n    res.status(200).json({\n      message: 'Password reset successfully',\n      success: true\n    });\n  } catch (error) {\n    console.error('Error resetting password:', error);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\nmodule.exports = authRouter;\n\n// const express = require('express');\n// const nodemailer = require('nodemailer');\n// const crypto = require('crypto');\n// const User = require('../models/User'); // Adjust path as necessary\n\n// const router = express.Router();\n\n// // OTP Generation and Sending Route\n// router.post('/forgot-password', async (req, res) => {\n//     const { email } = req.body;    \n\n//     try {\n//         // Find user by email    \n//         const user = await User.findOne({ email });\n//         if (!user) {\n//             return res.status(404).json({ message: 'User not found' });    \n//         }\n\n//         // Generate a random OTP\n//         const otp = crypto.randomInt(100000, 999999).toString();\n\n//         // Save the OTP in the user record\n//         user.otp = otp;\n//         await user.save();\n\n//         // Set up the email transporter\n//         const transporter = nodemailer.createTransport({\n//             service: 'gmail',    \n//             auth: {\n//                 user: process.env.EMAIL_USER,    \n//                 pass: process.env.EMAIL_PASS\n//             }\n//         });\n\n//         // Send the OTP email\n//         const mailOptions = {\n//             from: process.env.EMAIL_USER,    \n//             to: email,\n//             subject: 'Your OTP for Password Reset',\n//             text: `Your OTP is ${otp}. It is valid for 10 minutes.`\n//         };\n\n//         await transporter.sendMail(mailOptions);\n\n//         return res.status(200).json({ message: 'OTP sent to your email.' });\n//     } catch (error) {\n//         console.error(error);    \n//         return res.status(500).json({ message: 'Server error' });\n//     }\n// });\n\n// // OTP Verification Route\n// router.post('/verify-otp', async (req, res) => {\n//     const { email, otp } = req.body;    \n\n//     try {\n//         const user = await User.findOne({ email });    \n//         if (!user) {\n//             return res.status(404).json({ message: 'User not found' });    \n//         }\n\n//         // Check if the OTP is correct\n//         if (user.otp !== otp) {\n//             return res.status(400).json({ message: 'Invalid OTP' });    \n//         }\n\n//         return res.status(200).json({ message: 'OTP verified successfully' });\n//     } catch (error) {\n//         console.error(error);    \n//         return res.status(500).json({ message: 'Server error' });\n//     }\n// });\n\n// // Password Reset Route\n// router.post('/reset-password', async (req, res) => {\n//     const { email, newPassword } = req.body;    \n\n//     try {\n//         const user = await User.findOne({ email });    \n//         if (!user) {\n//             return res.status(404).json({ message: 'User not found' });    \n//         }\n\n//         // Update the password\n//         user.password = newPassword; // Hash the password before saving\n//         user.otp = undefined; // Clear the OTP\n//         await user.save();\n\n//         return res.status(200).json({ message: 'Password reset successfully' });\n//     } catch (error) {\n//         console.error(error);    \n//         return res.status(500).json({ message: 'Server error' });\n//     }\n// });\n\n// module.exports = router;\n\n//# sourceURL=webpack://DonarPlus/./src/routes/authRoutes.js?");

/***/ }),

/***/ "./src/routes/donor.route.js":
/*!***********************************!*\
  !*** ./src/routes/donor.route.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst donorRouter = express.Router();\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Donor = __webpack_require__(/*! ../models/donor.model.js */ \"./src/models/donor.model.js\");\nconst multer = __webpack_require__(/*! multer */ \"multer\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\n// Utility function to remove undefined fields from an object\nconst removeUndefinedFields = obj => {\n  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));\n};\n\n// Utility function to validate password strength\nconst validatePassword = password => {\n  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;\n  return passwordRegex.test(password);\n};\n\n// Get all donors\ndonorRouter.get('/', async (req, res) => {\n  try {\n    const donors = await Donor.find();\n    if (donors.length === 0) {\n      return res.status(404).json({\n        message: 'No donors found'\n      });\n    }\n    res.json(donors);\n  } catch (err) {\n    console.error('Error fetching donors:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      error: err.message\n    });\n  }\n});\n\n// Donor registration\ndonorRouter.post('/register', multer().none(), async (req, res) => {\n  const donorData = removeUndefinedFields({\n    fullname: req.body.fullname,\n    age: req.body.age,\n    gender: req.body.gender,\n    aadhar: req.body.aadhar,\n    phone: req.body.phone,\n    email: req.body.email,\n    address: req.body.address,\n    blood_type: req.body.blood_type,\n    medical_history: req.body.medical_history,\n    infection_diseases: req.body.infection_diseases,\n    surgical_history: req.body.surgical_history,\n    allergies: req.body.allergies,\n    smoking_status: req.body.smoking_status,\n    alcohol_consumption: req.body.alcohol_consumption,\n    drug_use: req.body.drug_use,\n    diet_exercise: req.body.diet_exercise,\n    organ_to_donate: req.body.organ_to_donate,\n    any_condition: req.body.any_condition,\n    next_of_kin: req.body.next_of_kin,\n    kin_contact: req.body.kin_contact,\n    legal_authorization: req.body.legal_authorization,\n    password: req.body.password // Ensure password is included\n  });\n\n  // Validate the password\n  if (!validatePassword(donorData.password)) {\n    return res.status(400).json({\n      message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',\n      success: false\n    });\n  }\n  try {\n    console.log('Donor data:', donorData);\n    const hashedPassword = await bcrypt.hash(donorData.password, 10);\n    donorData.password = hashedPassword;\n    const newDonor = new Donor(donorData);\n    await newDonor.save();\n    console.log('Donor registered successfully');\n    res.status(200).json({\n      message: 'Donor registered successfully',\n      success: true\n    });\n  } catch (err) {\n    console.error('Error inserting donor:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\n\n// Search for a specific donor by aadhar number\ndonorRouter.post('/search', async (req, res) => {\n  try {\n    const {\n      aadhar\n    } = req.body; // Get the aadhar number from the request body\n    const donor = await Donor.findOne({\n      aadhar\n    });\n    if (!donor) {\n      return res.status(404).json({\n        error: 'Donor not found'\n      });\n    }\n    res.json(donor);\n  } catch (err) {\n    console.error('Error searching donor:', err);\n    res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Fetch donor info by email or ID (after login)\ndonorRouter.get('/:email', async (req, res) => {\n  const email = req.params.email;\n  try {\n    const donor = await Donor.findOne({\n      email\n    });\n    if (!donor) {\n      return res.status(404).json({\n        message: 'Donor not found'\n      });\n    }\n    return res.status(200).json(donor);\n  } catch (err) {\n    console.error('Error fetching donor:', err);\n    return res.status(500).json({\n      message: 'Internal server error'\n    });\n  }\n});\nmodule.exports = donorRouter;\n\n//# sourceURL=webpack://DonarPlus/./src/routes/donor.route.js?");

/***/ }),

/***/ "./src/routes/hospital.route.js":
/*!**************************************!*\
  !*** ./src/routes/hospital.route.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst hospitalRouter = express.Router();\nconst multer = __webpack_require__(/*! multer */ \"multer\");\nconst Hospital = __webpack_require__(/*! ../models/hospital.model.js */ \"./src/models/hospital.model.js\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nconst User = __webpack_require__(/*! ../models/User.model.js */ \"./src/models/User.model.js\");\n\n// Helper function to remove fields with undefined values\nfunction removeUndefinedFields(obj) {\n  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));\n}\n\n// Password validation function\nfunction validatePassword(password) {\n  const passwordRegex = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$/;\n  return passwordRegex.test(password);\n}\nhospitalRouter.get('/', async (req, res) => {\n  try {\n    const donors = await Donor.find();\n    if (donors.length === 0) {\n      return res.status(404).json({\n        message: 'No donors found'\n      });\n    }\n    res.json(donors);\n  } catch (err) {\n    console.error('Error fetching donors:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      error: err.message\n    });\n  }\n});\n\n// Hospital registration route\nhospitalRouter.post('/register', multer().none(), async (req, res) => {\n  const hospitalData = removeUndefinedFields({\n    hospitalName: req.body.hospitalName,\n    hospitalType: req.body.hospitalType,\n    address: req.body.address,\n    city: req.body.city,\n    password: req.body.password,\n    state: req.body.state,\n    zipCode: req.body.zipCode,\n    contactNumber: req.body.contactNumber,\n    email: req.body.email,\n    registrationNumber: req.body.registrationNumber,\n    licenseNumber: req.body.licenseNumber,\n    cardiology: req.body.cardiology,\n    emergency: req.body.emergency,\n    pediatrics: req.body.pediatrics,\n    generalMedicine: req.body.generalMedicine,\n    emergency247: req.body.emergency247,\n    icu: req.body.icu,\n    pharmacy: req.body.pharmacy,\n    labServices: req.body.labServices,\n    totalBeds: req.body.totalBeds,\n    ambulance: req.body.ambulance,\n    wheelchair: req.body.wheelchair,\n    parking: req.body.parking,\n    primaryContact: req.body.primaryContact,\n    position: req.body.position,\n    contactPhone: req.body.contactPhone,\n    contactEmail: req.body.contactEmail\n  });\n\n  // Check if password is provided and validate it\n  if (!hospitalData.password) {\n    return res.status(400).json({\n      message: 'Password is required.',\n      success: false\n    });\n  }\n  if (!validatePassword(hospitalData.password)) {\n    return res.status(400).json({\n      message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',\n      success: false\n    });\n  }\n  try {\n    console.log('password:', hospitalData.password);\n    // Inside hospital registration route\n    const hashedPassword = await bcrypt.hash(hospitalData.password, 10);\n    // console.log('Hash being saved:', hashedPassword);\n    hospitalData.password = hashedPassword;\n    // const match = await bcrypt.compare(password, User.password);\n    // console.log('Password match result:', match);\n\n    // Save the hospital data\n    const newHospital = new Hospital(hospitalData);\n    await newHospital.save();\n    res.status(200).json({\n      message: 'Hospital registered successfully',\n      success: true\n    });\n  } catch (err) {\n    console.error('Error:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\n\n// Redirect to hospital dashboard HTML page\nhospitalRouter.get('/:email', async (req, res) => {\n  const email = req.params.email;\n  try {\n    // Find the hospital by email\n    const hospital = await Hospital.findOne({\n      email\n    });\n    if (!hospital) {\n      return res.status(404).json({\n        error: 'Hospital not found'\n      });\n    }\n\n    // Redirect to the hospital dashboard page\n    res.sendFile(path.join(__dirname, '../public/hosp_dashboard.html'));\n  } catch (err) {\n    console.error('Error fetching hospital:', err);\n    res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n// hospitalRouter.post('/login', async (req, res) => {\n//     const { email, password } = req.body;\n\n//     try {\n//         const hospital = await Hospital.findOne({ email });\n\n//         if (!hospital) {\n//             return res.status(404).json({ error: 'Hospital not found' });\n//         }\n\n//         const isPasswordValid = await bcrypt.compare(password, hospital.password);\n//         console.log('Password match:', isPasswordValid);\n//         if (isPasswordValid) {\n//             res.json({ success: true, message: 'Login successful' });\n//         } else {\n//             res.status(401).json({ error: 'Incorrect password' });\n//         }\n//     } catch (error) {\n//         console.error('Error during login:', error);\n//         res.status(500).json({ error: 'Internal server error' });\n//     }\n// });\n\nmodule.exports = hospitalRouter;\n\n//# sourceURL=webpack://DonarPlus/./src/routes/hospital.route.js?");

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

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

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
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

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst multer = __webpack_require__(/*! multer */ \"multer\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)({\n  path: path.join(__dirname, '..', '.env+')\n});\nconst app = express();\nconst port = \"3005\" || 0;\n\n// MongoDB Atlas connection\nmongoose.connect(\"mongodb+srv://vishalsharayu:yq2NL8lieOFlwlZH@donorplusdb.ak122su.mongodb.net/?retryWrites=true&w=majority&appName=Donorplusdb\", {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n}).then(() => {\n  console.log('Connected to MongoDB Atlas');\n}).catch(err => {\n  console.error('Error connecting to MongoDB Atlas:', err);\n});\n\n// Define Mongoose schemas and models\nconst donorSchema = new mongoose.Schema({\n  fullname: String,\n  age: String,\n  gender: String,\n  aadhar: String,\n  phone: String,\n  email: String,\n  address: String,\n  blood_type: String,\n  medical_history: String,\n  infection_diseases: String,\n  surgical_history: String,\n  allergies: String,\n  smoking_status: String,\n  alcohol_consumption: String,\n  drug_use: String,\n  diet_exercise: String,\n  organ_to_donate: String,\n  any_condition: String,\n  next_of_kin: String,\n  kin_contact: String,\n  legal_authorization: String,\n  password: {\n    type: String,\n    required: true\n  },\n  matchStatus: String // Add this line if it should exist in the schema\n});\nconst patientSchema = new mongoose.Schema({\n  fullName: String,\n  age: String,\n  gender: String,\n  aadhar: String,\n  phone: String,\n  email: String,\n  address: String,\n  blood_type: String,\n  medical_history: String,\n  infection_diseases: String,\n  surgical_history: String,\n  allergies: String,\n  smoking_status: String,\n  alcohol_consumption: String,\n  drug_use: String,\n  diet_exercise: String,\n  organ_needed: String,\n  reason: String,\n  consent: String,\n  legal_information: String,\n  password: {\n    type: String,\n    required: true\n  }\n});\nconst Donor = mongoose.model('Donor', donorSchema);\nconst Patient = mongoose.model('Patient', patientSchema);\n\n// Middleware\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\n\n// Serve static files\nconst publicPath = path.join(__dirname, '..', 'app', 'dist', 'public');\napp.use(express.static(publicPath));\n\n// Utility function to remove undefined fields from an object\nconst removeUndefinedFields = obj => {\n  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));\n};\n\n// API Routes\n\n// Utility function to validate password strength\nconst validatePassword = password => {\n  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;\n  return passwordRegex.test(password);\n};\n\n// Donor registration\napp.post('/api/donor/register', multer().none(), async (req, res) => {\n  const donorData = removeUndefinedFields({\n    fullname: req.body.fullname,\n    age: req.body.age,\n    gender: req.body.gender,\n    aadhar: req.body.aadhar,\n    phone: req.body.phone,\n    email: req.body.email,\n    address: req.body.address,\n    blood_type: req.body.blood_type,\n    medical_history: req.body.medical_history,\n    infection_diseases: req.body.infection_diseases,\n    surgical_history: req.body.surgical_history,\n    allergies: req.body.allergies,\n    smoking_status: req.body.smoking_status,\n    alcohol_consumption: req.body.alcohol_consumption,\n    drug_use: req.body.drug_use,\n    diet_exercise: req.body.diet_exercise,\n    organ_to_donate: req.body.organ_to_donate,\n    any_condition: req.body.any_condition,\n    next_of_kin: req.body.next_of_kin,\n    kin_contact: req.body.kin_contact,\n    legal_authorization: req.body.legal_authorization,\n    password: req.body.password // Ensure password is included\n  });\n\n  // Validate the password\n  if (!validatePassword(donorData.password)) {\n    return res.status(400).json({\n      message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',\n      success: false\n    });\n  }\n  try {\n    console.log('Donor data:', donorData);\n    const hashedPassword = await bcrypt.hash(donorData.password, 10);\n    donorData.password = hashedPassword;\n    const newDonor = new Donor(donorData);\n    await newDonor.save();\n    console.log('Donor registered successfully');\n    res.status(200).json({\n      message: 'Donor registered successfully',\n      success: true\n    });\n  } catch (err) {\n    console.error('Error inserting donor:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\n\n// Patient registration\napp.post('/api/patient/register', multer().none(), async (req, res) => {\n  console.log('Request Body:', req.body); // Log the request body to debug\n\n  const patientData = removeUndefinedFields({\n    fullName: req.body.fullname,\n    age: req.body.age,\n    gender: req.body.gender,\n    aadhar: req.body.aadhar,\n    phone: req.body.phone,\n    email: req.body.email,\n    address: req.body.address,\n    blood_type: req.body.blood_type,\n    medical_history: req.body.medical_history,\n    infection_diseases: req.body.infection_diseases,\n    surgical_history: req.body.surgical_history,\n    allergies: req.body.allergies,\n    smoking_status: req.body.smoking_status,\n    alcohol_consumption: req.body.alcohol_consumption,\n    drug_use: req.body.drug_use,\n    diet_exercise: req.body.diet_exercise,\n    organ_needed: req.body.organ_needed,\n    reason: req.body.reason,\n    consent: req.body.consent,\n    legal_information: req.body.legal_information,\n    password: req.body.password // Ensure password is included\n  });\n\n  // Validate the password\n  if (!validatePassword(patientData.password)) {\n    return res.status(400).json({\n      message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',\n      success: false\n    });\n  }\n  try {\n    console.log('Patient data:', patientData);\n\n    // Ensure the password is not undefined before hashing\n    const hashedPassword = await bcrypt.hash(patientData.password, 10);\n    patientData.password = hashedPassword;\n    const newPatient = new Patient(patientData);\n    await newPatient.save();\n    console.log('Patient registered successfully');\n    res.status(200).json({\n      message: 'Patient registered successfully',\n      success: true\n    });\n  } catch (err) {\n    console.error('Error inserting patient:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      success: false\n    });\n  }\n});\n\n// Login route\n// Login route\n// app.post('/api/login', async (req, res) => {\n//     const { email, password, userType } = req.body;\n\n//     try {\n//         const model = userType === 'donor' ? Donor : Patient;\n//         const user = await model.findOne({ email });\n\n//         if (!user) {\n//             return res.status(404).json({ error: 'User not found' });\n//         }\n\n//         const match = await bcrypt.compare(password, user.password);\n//         if (match) {\n//             res.status(200).json({ message: 'Login successful' });\n//         } else {\n//             res.status(401).json({ error: 'Invalid credentials' });\n//         }\n//     } catch (err) {\n//         console.error('Error during login:', err);\n//         res.status(500).json({ error: 'Internal server error' });\n//     }\n// });\n\napp.post('/api/login', async (req, res) => {\n  const {\n    email,\n    password,\n    role\n  } = req.body; // Extract email, password, and role from the request body\n\n  try {\n    let user; // This will store the user based on the role\n\n    // Depending on the role, check the Donor or Patient collection\n    if (role === 'donor') {\n      user = await Donor.findOne({\n        email\n      }); // Look for user in Donor collection\n    } else if (role === 'patient') {\n      user = await Patient.findOne({\n        email\n      }); // Look for user in Patient collection\n    } else {\n      return res.status(400).json({\n        error: 'Invalid role selected'\n      });\n    }\n\n    // If no user is found\n    if (!user) {\n      return res.status(404).json({\n        error: 'User not found'\n      });\n    }\n\n    // Compare the provided password with the hashed password in the database\n    const match = await bcrypt.compare(password, user.password);\n    if (match) {\n      // Passwords match - Login successful\n      return res.status(200).json({\n        message: 'Login successful',\n        user\n      });\n    } else {\n      // Passwords don't match\n      return res.status(401).json({\n        error: 'Invalid credentials'\n      });\n    }\n  } catch (err) {\n    console.error('Error during login:', err);\n    return res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Fetch donor info by email or ID (after login)\napp.get('/api/donor/:email', async (req, res) => {\n  const email = req.params.email;\n  try {\n    const donor = await Donor.findOne({\n      email\n    });\n    if (!donor) {\n      return res.status(404).json({\n        error: 'Donor not found'\n      });\n    }\n    res.status(200).json({\n      fullname: donor.fullname,\n      age: donor.age,\n      gender: donor.gender,\n      blood_type: donor.blood_type,\n      organ_to_donate: donor.organ_to_donate,\n      matchStatus: donor.matchStatus || 'No match found' // Ensure matchStatus is returned\n    });\n  } catch (err) {\n    console.error('Error fetching donor:', err);\n    res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\napp.get('/api/patient/:email', async (req, res) => {\n  const email = req.params.email;\n  try {\n    // Find the patient by email\n    const patient = await Patient.findOne({\n      email\n    });\n    if (!patient) {\n      return res.status(404).json({\n        error: 'Patient not found'\n      });\n    }\n\n    // Return patient information\n    res.status(200).json({\n      fullName: patient.fullName,\n      age: patient.age,\n      gender: patient.gender,\n      blood_type: patient.blood_type,\n      organ_needed: patient.organ_needed,\n      matchStatus: patient.matchStatus || 'No match found'\n    });\n  } catch (err) {\n    console.error('Error fetching patient:', err);\n    res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Get all donors\napp.get('/api/donors', async (req, res) => {\n  try {\n    const donors = await Donor.find();\n    if (donors.length === 0) {\n      return res.status(404).json({\n        message: 'No donors found'\n      });\n    }\n    res.json(donors);\n  } catch (err) {\n    console.error('Error fetching donors:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      error: err.message\n    });\n  }\n});\n\n// Search for a specific donor by aadhar number\napp.post('/api/donor/search', async (req, res) => {\n  try {\n    const {\n      aadhar\n    } = req.body; // Get the aadhar number from the request body\n    const donor = await Donor.findOne({\n      aadhar\n    });\n    if (!donor) {\n      return res.status(404).json({\n        error: 'Donor not found'\n      });\n    }\n    res.json(donor);\n  } catch (err) {\n    console.error('Error searching donor:', err);\n    res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Get all patients\napp.get('/api/patients', async (req, res) => {\n  try {\n    const patients = await Patient.find();\n    if (patients.length === 0) {\n      return res.status(404).json({\n        message: 'No patients found'\n      });\n    }\n    res.status(200).json(patients);\n  } catch (err) {\n    console.error('Error fetching patients:', err);\n    res.status(500).json({\n      message: 'Internal server error',\n      error: err.message\n    });\n  }\n});\n\n// Search for a specific patient by aadhar number\napp.post('/api/patient/search', async (req, res) => {\n  try {\n    const {\n      aadhar\n    } = req.body; // Get the aadhar number from the request body\n    const patient = await Patient.findOne({\n      aadhar\n    });\n    if (!patient) {\n      return res.status(404).json({\n        error: 'Patient not found'\n      });\n    }\n    res.json(patient);\n  } catch (err) {\n    console.error('Error searching patient:', err);\n    res.status(500).json({\n      error: 'Internal server error'\n    });\n  }\n});\n\n// Additional routes for other HTML files\napp.get('/about', (req, res) => {\n  res.sendFile(path.join(publicPath, 'about.html'));\n});\napp.get('/contact', (req, res) => {\n  res.sendFile(path.join(publicPath, 'contact.html'));\n});\napp.get('*', (req, res) => {\n  res.sendFile(path.join(publicPath, 'index.html'));\n});\n\n// Error handling middleware\napp.use((err, req, res, next) => {\n  console.error('Server error:', err);\n  res.status(500).json({\n    message: 'Internal server error',\n    error: err.message\n  });\n});\n\n// Start the server\napp.listen(port, () => {\n  console.log(`Server running at http://localhost:${port}/homepage.html`);\n});\n\n//# sourceURL=webpack://DonarPlus/./src/main.js?");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
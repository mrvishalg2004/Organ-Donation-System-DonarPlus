// // const express = require('express');
// // const router = express.Router();

// // // Placeholder route for transplants
// // router.get('/', (req, res) => {
// //     res.status(200).json({ message: 'Transplants route' });
// // });

// // // Export the router
// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Donor = require('../models/donor');
// const Patient = require('../models/patient');

// // Fetch potential matches
// router.get('/matches', async (req, res) => {
//     try {
//         const donors = await Donor.find();
//         const patients = await Patient.find();
//         const matches = [];

//         patients.forEach(patient => {
//             donors.forEach(donor => {
//                 if (patient.blood_type === donor.blood_type && patient.organ_needed === donor.organ_to_donate) {
//                     matches.push({
//                         patientName: patient.fullName,
//                         donorName: donor.fullname,
//                         organ: donor.organ_to_donate
//                     });
//                 }
//             });
//         });

//         res.json(matches);
//     } catch (err) {
//         console.error('Error fetching matches:', err);
//         res.status(500).json({ message: 'Internal server error', error: err.message });
//     }
// });

// module.exports = router;

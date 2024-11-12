// // src/routes/user.routes.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User.model.js');
// const authMiddleware = require('../middleware/auth.js'); // Import auth middleware

// // Check user type and redirect based on login type
// router.get('/userType', authMiddleware, async (req, res) => {
//     try {
//         const email = req.user.email; // Get email from the decoded token

//         // Find user by email in the database
//         const user = await User.findOne({ email });

//         if (user) {
//             // Redirect based on userType
//             if (user.userType === 'hospital') {
//                 res.json({ redirect: 'hosp_dashboard.html' });
//             } else if (user.userType === 'donor') {
//                 res.json({ redirect: 'donor-dashboard.html' });
//             } else if (user.userType === 'patient') {
//                 res.json({ redirect: 'patient-dashboard.html' });
//             }
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         console.error("Error fetching user type:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;

const express = require('express');
const userRouter = express.Router();
const User = require('../models/User.model');
// const otp = require('../models/otp.model');
const authMiddleware = require('../middleware/auth'); // Import the middleware

// Endpoint to get user type, protected by authMiddleware
userRouter.get('/api/userType', authMiddleware, async (req, res) => {
    const email = req.user.email; // Now accessible from decoded token
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.json({ userType: user.userType });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = userRouter;

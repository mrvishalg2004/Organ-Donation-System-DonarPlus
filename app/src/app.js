// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const path = require('path');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const publicPath = path.join(__dirname, '..', 'app', 'dist', 'public');
// app.use(express.static(publicPath));


// const donorRouter = require('./routes/donor.route.js');
// const patientRouter = require('./routes/patient.route.js');
// const authRouter = require('./routes/authRoutes.js')


// app.use('/api/donor',donorRouter);
// app.use('/api/patient',patientRouter);
// app.use('/api',authRouter);

// // Additional routes for other HTML files
// app.get('/about', (req, res) => {
//     res.sendFile(path.join(publicPath, 'about.html'));
// });



// app.get('/contact', (req, res) => {
//     res.sendFile(path.join(publicPath, 'contact.html'));
// });



// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// });


// module.exports = app;


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicPath = path.join(__dirname, '..', 'app', 'dist', 'public');
app.use(express.static(publicPath));

// Import Routes
const donorRouter = require('./routes/donor.route.js');
const patientRouter = require('./routes/patient.route.js');
const authRouter = require('./routes/authRoutes.js');
const hospitalRouter = require('./routes/hospital.route.js'); // Add this line
const userRoutes = require('./routes/User.routes.js');
//const loginRoute = require('./routes/login.route.js');

// Use Routes
app.use('/api/donor', donorRouter);
app.use('/api/patient', patientRouter);
app.use('/api', authRouter);
app.use('/api/hospital', hospitalRouter); // Add this line
app.use('/api', userRoutes);
//app.use('/api', loginRoute);

// Additional routes for other HTML files
app.get('/about', (req, res) => {
    res.sendFile(path.join(publicPath, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(publicPath, 'contact.html'));
});

// Catch-all route for Single Page Application
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;

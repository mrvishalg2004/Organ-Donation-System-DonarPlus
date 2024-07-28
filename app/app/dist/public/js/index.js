// // // index.js
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const connectToMongoDB = require('./mongodb-connection'); // Ensure this file is created as described
// // require('dotenv').config();

// // const app = express();
// // const port = 3005;

// // // Connect to MongoDB
// // connectToMongoDB();

// // // Middleware
// // app.use(express.json()); // For parsing application/json
// // app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// // // Routes
// // app.use('/api/donors', require('./routes/donors')); // Example route file
// // app.use('/api/patients', require('./routes/patients')); // Example route file
// // app.use('/api/transplants', require('./routes/transplants')); // Example route file

// // // Error Handling Middleware
// // app.use((err, req, res, next) => {
// //     console.error(err.stack);
// //     res.status(500).send('Something went wrong!');
// // });

// // // Start the server
// // app.listen(port, () => {
// //     console.log(`Server running on http://localhost:${port}`);
// // });


// const express = require('express');
// const path = require('path'); // Make sure to require 'path'
// const mongoose = require('mongoose');
// const connectToMongoDB = require('./mongodb-connection'); // Ensure this file is created as described
// require('dotenv').config();

// const app = express();
// const port = 3005;

// // Connect to MongoDB
// connectToMongoDB();

// // Middleware
// app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// app.use(express.static(path.join(__dirname, '..', 'public'))); // Updated to navigate out of 'js' folder

// // Routes
// app.use('/api/donors', require('../../../../src/routes/donors')); // Updated path
// app.use('/api/patients', require('../../../../src/routes/patients')); // Updated path
// app.use('/api/transplants', require('../../../../src/routes/transplants')); // Updated path

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

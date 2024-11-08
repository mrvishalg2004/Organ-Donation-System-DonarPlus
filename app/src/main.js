const mongoose = require('mongoose');
const path = require('path');
const app = require('./app');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });



// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
    app.on("error",(error)=>{
        console.error(error);
    })
    app.listen(process.env.PORT || 3005, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}/homepage.html`);
    });
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error('Server error:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
// });


// Start the server

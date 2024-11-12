const jwt = require('jsonwebtoken'); // Ensure jsonwebtoken is installed
require('dotenv').config(); // Load environment variables

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request for access in routes
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;

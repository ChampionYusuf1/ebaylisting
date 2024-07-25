const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Changed to separate authRoutes
const userRoutes = require('./routes/userRoutes'); // Separate userRoutes
const partRoutes = require('./routes/partRoutes');
const db = require('./config/db');

dotenv.config();

const app = express();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from uploads

// Use Routes
app.use('/api/auth', authRoutes); // For login
app.use('/api', partRoutes);
app.use('/api', userRoutes); // For user management

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

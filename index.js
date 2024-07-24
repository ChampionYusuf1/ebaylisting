const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Add this line

dotenv.config();

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

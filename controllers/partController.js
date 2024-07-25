const db = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

exports.createListing = async (req, res) => {
    const { part_number, price, location, description } = req.body;
    const image = req.file ? req.file.path : null;  // Get the file path from multer
    
    try {
        db.query('INSERT INTO parts (part_number, price, location, image, description) VALUES (?, ?, ?, ?, ?)', 
            [part_number, price, location, image, description], 
            (err, results) => {
                if (err) {
                    console.error("Database error: ", err);
                    return res.status(500).json({ message: "Database error" });
                }
                console.log("Successful part creation");
                res.status(201).json({ message: "Part created successfully" });
            }
        );
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};

exports.fetchListings = async (req, res) => {
    try {
        db.query('SELECT * FROM parts', (err, results) => {
            if (err) {
                console.error("Database error: ", err);
                return res.status(500).json({ message: "Database error" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    try {
        db.query('DELETE FROM parts WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error("Database error: ", err);
                return res.status(500).json({ message: "Database error" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Listing not found" });
            }
            res.status(200).json({ message: "Listing deleted successfully" });
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};

const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Login attempt:', username);
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            if (results.length === 0) {
                console.log('User does not exist');
                return res.status(400).json({ message: 'User does not exist' });
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.log('Invalid credentials');
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) {
                        console.error('Token error:', err);
                        return res.status(500).json({ message: 'Token error' });
                    }
                    console.log('Login successful:', token);
                    res.json({ token });
                }
            );
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};
exports.createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Creating user:', username);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            console.log('User created successfully:', results);
            res.status(201).json({ message: 'User created' });
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted' });
    });
};

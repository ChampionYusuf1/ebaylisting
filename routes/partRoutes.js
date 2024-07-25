const express = require('express');
const router = express.Router();
const multer = require('multer');
const partController = require('../controllers/partController');
const authMiddleware = require('../middleware/authMiddleware');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/createlisting', authMiddleware, upload.single('image'), partController.createListing);
router.get('/fetchlistings', authMiddleware, partController.fetchListings);
router.delete('/deletelisting/:id', authMiddleware, partController.deleteListing);

module.exports = router;

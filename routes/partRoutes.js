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

router.post('/createpart', authMiddleware, upload.single('image'), partController.createPart);
router.get('/fetchparts', authMiddleware, partController.fetchParts);
router.delete('/deletepart/:id', authMiddleware, partController.deletePart);

module.exports = router;

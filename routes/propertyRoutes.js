const express = require('express');
const { createProperty, getProperties, getProperty } = require('../controllers/propertyController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', protect, adminOnly, createProperty);

module.exports = router;

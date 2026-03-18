const express = require('express');
const router = express.Router();
const { createMembership, getMembershipByUserId } = require('../controllers/membershipController');

// Activate membership after payment
router.post('/activate', createMembership);

// Get current membership status
router.get('/:userId', getMembershipByUserId);

module.exports = router;

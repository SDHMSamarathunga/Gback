const express = require('express');
const router = express.Router();
const { addWorkout, getWorkouts } = require('../controllers/workoutController');

router.post('/', addWorkout);
router.get('/:userId', getWorkouts);

module.exports = router;

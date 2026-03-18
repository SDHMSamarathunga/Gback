const Workout = require('../models/Workout');

const addWorkout = async (req, res) => {
    try {
        const { userId, type, count } = req.body;
        if (!userId || !type || count === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newWorkout = new Workout({
            userId,
            type,
            count
        });

        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add workout' });
    }
};

const getWorkouts = async (req, res) => {
    try {
        const { userId } = req.params;
        const workouts = await Workout.find({ userId }).sort({ date: -1 });
        res.status(200).json(workouts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
};

module.exports = {
    addWorkout,
    getWorkouts
};

const User = require('../models/user');

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, gender, age, weight, height, fitnessGoal, experienceLevel } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            fullName,
            email,
            password, // NOTE: Use hashing (bcrypt) in production!
            gender,
            age,
            weight,
            height,
            fitnessGoal,
            experienceLevel
        });

        await newUser.save();

        res.status(201).json({
            message: 'Evolution Initialized! Welcome to the Club. 💪',
            user: { id: newUser._id, fullName, email }
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: `Selection missing: ${messages.join(', ')}` });
        }
        console.error(err);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials access denied' });
        }

        res.status(200).json({
            message: 'Access Granted! Welcome back athlete. 💪',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                fitnessGoal: user.fitnessGoal,
                experienceLevel: user.experienceLevel,
                planName: user.planName || null    // null if no plan yet
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during portal access' });
    }
};

module.exports = { registerUser, loginUser };

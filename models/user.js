const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    planName: { type: String, default: null }   // e.g. "Basic" | "Elite" | "Premium"
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

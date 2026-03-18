const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planName: { type: String, required: true }, // BASIC, PREMIUM, ELITE
    amount: { type: Number, required: true },
    status: { type: String, default: 'ACTIVE' },
    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);

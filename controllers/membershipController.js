const Membership = require('../models/membership');
const User = require('../models/user');

const createMembership = async (req, res) => {
    try {
        const { userId, planName, amount } = req.body;

        if (!userId || !planName || !amount) {
            return res.status(400).json({ message: 'Missing transaction details' });
        }

        // Check if user already has an active, non-expired membership
        const existingMembership = await Membership.findOne({
            userId,
            status: 'ACTIVE',
            expiryDate: { $gt: new Date() }
        });

        if (existingMembership) {
            const expiry = new Date(existingMembership.expiryDate).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
            });
            return res.status(400).json({
                message: `You already have an active ${existingMembership.planName} plan. It expires on ${expiry}. You can purchase a new plan after it ends.`,
                existingPlan: existingMembership.planName,
                expiryDate: existingMembership.expiryDate
            });
        }

        // Calculate expiry (1 month from now)
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);

        const newMembership = new Membership({
            userId,
            planName,
            amount,
            expiryDate
        });

        await newMembership.save();

        // ── Also update planName on the User document ──────────────────
        await User.findByIdAndUpdate(userId, { planName });

        res.status(201).json({
            message: 'Membership Activated! Welcome to the Elite. 🏅',
            membership: newMembership
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Transaction failed to process' });
    }
};

const getMembershipByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const membership = await Membership.findOne({ userId, status: 'ACTIVE' }).sort({ createdAt: -1 });

        if (!membership) {
            return res.status(404).json({ message: 'No active membership found' });
        }

        res.status(200).json(membership);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving status' });
    }
};

module.exports = { createMembership, getMembershipByUserId };

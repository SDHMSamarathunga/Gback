let stripe;
if (process.env.STRIPE_SECRET_KEY) {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} else {
    console.warn('Warning: STRIPE_SECRET_KEY is missing. Stripe features will not work.');
}

const createPaymentIntent = async (req, res) => {
    try {
        if (!stripe) {
            console.error('Cannot create payment intent: Stripe is not initialized.');
            return res.status(500).json({ message: 'Payment gateway configuration missing' });
        }

        const { amount } = req.body;

        // Stripe expects amount in cents
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'lkr',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.error('Stripe initialization or payment intent creation failed:', err);
        res.status(500).json({ message: 'Stripe Gateway Sync Failed' });
    }
};

module.exports = { createPaymentIntent };

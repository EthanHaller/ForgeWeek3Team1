var express = require("express")
var stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET)
var router = express.Router()

const domain = 'http://localhost:3000'

router.post("/", async (req, res, next) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'iPhone 9',
                        description: 'An apple mobile which is nothing like apple',
                        images: []
                    },
                    unit_amount: '54900'
                },
                quantity: 1
			},
		],
		mode: "payment",
		success_url: "http://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}",
		cancel_url: '$http://localhost:3000/cart',
	});

    res.redirect(303, session.url);
})

module.exports = router

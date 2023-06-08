var express = require("express")
var router = express.Router()
var Stripe = require("stripe")
var stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET)

const domain = "http://localhost:3000"

router.post("/", async (req, res, next) => {
	const { items } = req.body

	const lineItems = items.map((item) => {
		return {
			price_data: {
				currency: "usd",
				product_data: {
					name: item.title,
					description: item.description,
					images: item.images,
				},
				unit_amount: item.price * 100,
			},
			quantity: 1,
		}
		console.log(lineItems)
	})

	const session = await stripe.checkout.sessions.create({
		/*
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
        */
		line_items: lineItems,
		mode: "payment",
		success_url:
			"http://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}",
		cancel_url: "http://localhost:3000/cart",
	})
	res.send(session.url)
})

router.get("/order/success", async (req, res, next) => {
	const session = await stripe.checkout.sessions.retrieve(
		req.query.session_id
	)
	const lineItems = await stripe.checkout.sessions.listLineItems(
		req.query.session_id
	)

	res.send({ results: session.customer_details.name, lineItems: lineItems })
})

module.exports = router

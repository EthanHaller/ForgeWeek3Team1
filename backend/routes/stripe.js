var express = require("express")
var router = express.Router()
var Stripe = require("stripe")
var stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET)

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
					metadata: {
						itemId: item.id
					}
				},
				unit_amount: item.price * 100,
			},
			quantity: 1,
		}
	})

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: "payment",
		success_url:
			"https://glittery-malasada-22e17e.netlify.app/order/success?session_id={CHECKOUT_SESSION_ID}",
		cancel_url: "https://glittery-malasada-22e17e.netlify.app/cart",
	})
	res.send(session.url)
})

router.get("/order/success", async (req, res, next) => {
    const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
    );
    const lineItems = await stripe.checkout.sessions.listLineItems(
        req.query.session_id
    );

    // Fetch the product data for each line item
    const lineItemsWithMetadata = await Promise.all(
        lineItems.data.map(async (lineItem) => {
            const product = await stripe.products.retrieve(
                lineItem.price.product
            );
            return {
                ...lineItem,
                metadata: product.metadata
            };
        })
    );

    res.send({
        results: session.customer_details.name,
        lineItems: lineItemsWithMetadata
    });
});

module.exports = router

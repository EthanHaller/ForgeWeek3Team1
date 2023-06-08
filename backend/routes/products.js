var express = require("express");
var router = express.Router();

router.put("/get-products", async (req, res) => {
	const allProducts = []
	const results = await fetch(
		"https://dummyjson.com/products/category/" + req.body.category
	).then((results) => results.json())
	results.products.forEach((product) => {
		allProducts.push(product)
	})
	res.json({ results: allProducts })
})

router.get("/get-product/:productId", (req, res, next) => {
    fetch(`https://dummyjson.com/products/${req.params.productId}`)
    .then(res => res.json())
    .then(j => res.send(j))
})

module.exports = router

var express = require("express")
var router = express.Router()

router.get("/", (req, res, next) => {
	const categories = [
		"smartphones",
		"laptops",
		"fragrances",
		"skincare",
		"groceries",
		"home-decoration",
		"furniture",
		"tops",
		"womens-dresses",
		"womens-shoes",
		"mens-shirts",
		"mens-shoes",
		"mens-watches",
		"womens-watches",
		"womens-bags",
		"womens-jewellery",
		"sunglasses",
		"automotive",
		"motorcycle",
		"lighting",
	]
	const formattedCategories = formatCategories(categories)
	res.json({ results: formattedCategories })
	res.status(200)
})

function formatCategories(categories) {
	const formattedCategories = []
	categories.forEach((item) => {
		const formatted = item.replace("-", " ")
		const capitalized = formatted.replace(
			/(^\w{1})|(\s+\w{1})/g,
			(letter) => letter.toUpperCase()
		)
		formattedCategories.push({ raw: item, formatted: capitalized })
	})
	return formattedCategories
}

module.exports = router

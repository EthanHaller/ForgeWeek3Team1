const express = require("express");
const router = express.Router();

router.put("/get-products", async (req, res) => {

    const allProducts = [];
    const results = await fetch('https://dummyjson.com/products/category/' + req.body.category)
        .then(results => results.json())
    results.products.forEach((product) => {
        allProducts.push(product)
    });
    res.json({ results: allProducts });
})

module.exports = router;
const express = require("express");
const router = express.Router();

router.put("/get-products", async (req, res) => {

    const allProducts = [];
    const results = await fetch('https://dummyjson.com/products/category/' + req.body.category)
        .then(results => results.json())
    results.products.forEach((product) => {
        allProducts.push(product)
    });
    allProducts.forEach((product) => {
        switch (product.category) {
            case 'smartphones' || 'laptops':
                product.colors = ['silver', 'black', 'navy']
                break;
            case 'tops' || 'womens-dresses' || 'mens-shirts':
                product.colors = ['red', 'blue', 'green', 'purple', 'black', 'white']
                product.sizes = ['XS', 'small', 'medium', 'large', 'XL', '2XL']
                break;
            case 'home-decoration' || 'furniture':
                product.colors = ['gray', 'black', 'white', 'brown']
                break;
            case 'womens-shoes' || 'mens-shoes':
                product.colors = ['white', 'black', 'mixed']
                product.sizes = ['7', '8', '9', '10', '11', '12', '13']
                break;
            case 'womens-watches' || 'mens-watches' || 'womens-jewellery':
                product.colors = ['gold', 'silver']
                product.sizes = ['small', 'medium', 'large']
                break;
            case 'sunglasses':
                product.colors = ['black', 'silver']
                break;
        }
    })
    res.json({ results: allProducts });
})

module.exports = router;
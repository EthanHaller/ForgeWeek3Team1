var express = require("express");
var router = express.Router();

router.put("/get-products", async (req, res) => {

    const allProducts = [];
    const results = await fetch('https://dummyjson.com/products/' + req.body.category)
        .then(results => results.json())
    results.products.forEach((product) => {
        allProducts.push(product)
    });
    allProducts.forEach((product, index) => {
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
        product.order = index;
    })
    res.json({ results: allProducts });
})

router.put("/get-item", async (req, res) => {
    const result = await fetch('https://dummyjson.com/products/' + req.body.id)
        .then(result => result.json())
    switch (result.category) {
        case 'smartphones':
            result.colors = ['silver', 'black', 'navy']
            break;
        case 'laptops':
            result.colors = ['silver', 'black', 'navy']
            break;
        case 'tops':
            result.colors = ['red', 'blue', 'green', 'purple', 'black', 'white']
            result.sizes = ['XS', 'small', 'medium', 'large', 'XL', '2XL']
            break;
        case 'womens-dresses':
            result.colors = ['red', 'blue', 'green', 'purple', 'black', 'white']
            result.sizes = ['XS', 'small', 'medium', 'large', 'XL', '2XL']
            break;
        case 'mens-shirts':
            result.colors = ['red', 'blue', 'green', 'purple', 'black', 'white']
            result.sizes = ['XS', 'small', 'medium', 'large', 'XL', '2XL']
            break;
        case 'home-decoration':
            result.colors = ['gray', 'black', 'white', 'brown']
            break;
        case 'furniture':
            result.colors = ['gray', 'black', 'white', 'brown']
            break;
        case 'womens-shoes':
            result.colors = ['white', 'black']
            result.sizes = ['7', '8', '9', '10', '11', '12', '13']
            break;
        case 'mens-shoes':
            result.colors = ['white', 'black']
            result.sizes = ['7', '8', '9', '10', '11', '12', '13']
            break;
        case 'womens-watches':
            result.colors = ['gold', 'silver']
            result.sizes = ['small', 'medium', 'large']
            break;
        case 'mens-watches':
            result.colors = ['gold', 'silver']
            result.sizes = ['small', 'medium', 'large']
            break;
        case 'womens-jewellery':
            result.colors = ['gold', 'silver']
            result.sizes = ['small', 'medium', 'large']
            break;
        case 'sunglasses':
            result.colors = ['black', 'silver']
            break;
    }
    res.json({ item: result });
})

router.get("/get-product/:productId", (req, res, next) => {
    fetch(`https://dummyjson.com/products/${req.params.productId}`)
    .then(res => res.json())
    .then(j => res.send(j))
})

module.exports = router;
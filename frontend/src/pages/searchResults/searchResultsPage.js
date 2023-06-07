import react, { useState, useEffect } from 'react';
import "./SearchResults.css"
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Container, Button, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useTheme } from '@emotion/react';

export default function SearchResultsPage() {
    const theme = useTheme();
    const params = useParams();
    const category = params.category;
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const [partFiltered, setPartFiltered] = useState([]);

    useEffect(() => {
        getProducts()
    }, [])
    async function getProducts() {
        await fetch("http://localhost:9000/products/get-products", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: category })
        })
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .then(setFilteredProducts);
    }

    function filterPrice() {
        if (priceFilter.length > 0) {
            let temp = products.results.filter((product) => {
                return isRightPrice(product)
            })
            if (colorFilter.length > 0) {
                temp = temp.filter((product) => {
                    if (!product.colors)
                        return false;
                    return isRightColor(product)
                })
            }
            setFilteredProducts(temp);
        }
        else if (colorFilter.length === 0) {
            setFilteredProducts(products.results)
        }
        else if (colorFilter.length > 0) {
            filterColor();
        }
    }

    function isRightPrice(product) {
        let isPrice = false;
        priceFilter.forEach((filter) => {
            if (filter === "upper") {
                if (product.price > 120)
                    isPrice = true;
            }
            if (filter === "120") {
                if (product.price > 90 && product.price <= 120)
                    isPrice = true;
            }
            if (filter === "90") {
                if (product.price > 60 && product.price <= 90)
                    isPrice = true;
            }
            if (filter === "60") {
                if (product.price > 30 && product.price <= 60) {
                    isPrice = true;
                }
            }
            if (filter === "30") {
                if (product.price > 0 && product.price <= 30)
                    isPrice = true;
            }
        })
        return isPrice;
    }

    function filterColor() {
        if (colorFilter.length > 0) {
            let temp = products.results.filter((product) => {
                if (!product.colors)
                    return false;
                return isRightColor(product)
            })
            if (priceFilter.length > 0) {
                console.log(filteredProducts)
                temp = temp.filter((product) => {
                    return isRightPrice(product)
                })
            }
            setFilteredProducts(temp);
        }
        else if (priceFilter.length === 0) {
            setFilteredProducts(products.results)
        }
        else if (priceFilter.length > 0) {
            filterPrice();
        }
    }

    function isRightColor(product) {
        let isColor = false;
        colorFilter.forEach((filter) => {
            product.colors.forEach((color) => {
                if (filter === color)
                    isColor = true;
            })
        })
        return isColor;
    }

    //filtering results
    useEffect(() => {
        filterPrice();
    }, [products, priceFilter])

    useEffect(() => {
        filterColor();
    }, [products, colorFilter])

    function handlePriceChecked(e) {
        if (e.target.checked) {
            setPriceFilter([...priceFilter, e.target.value]);
        }
        else {
            setPriceFilter(priceFilter.filter((filter) => filter !== e.target.value));
        }
    }

    function handleColorChecked(e) {
        if (e.target.checked) {
            setColorFilter([...colorFilter, e.target.value]);
        }
        else {
            setColorFilter(colorFilter.filter((filter) => filter !== e.target.value));
        }
    }

    return (
        <>
            <div>
                <h1>{category}</h1>
            </div>

            <div className='structure'>
                <div className='leftThird' />

                <div className='leftThird'>
                    <h1 style={{ textAlign: "left" }}>Filter/Sort</h1>
                    <details>
                        <summary>Price</summary>
                        <details-menu>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value="30" onChange={handlePriceChecked} />} label="$0-$30" />
                                <FormControlLabel control={<Checkbox value="60" onChange={handlePriceChecked} />} label="$30-$60" />
                                <FormControlLabel control={<Checkbox value="90" onChange={handlePriceChecked} />} label="$60-$90" />
                                <FormControlLabel control={<Checkbox value="120" onChange={handlePriceChecked} />} label="$90-$120" />
                                <FormControlLabel control={<Checkbox value="upper" onChange={handlePriceChecked} />} label="$120+" />
                            </FormGroup>
                        </details-menu>
                    </details>

                    <details style={{ marginTop: "7%" }}>
                        <summary>Colors</summary>
                        <details-menu>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value="black" onChange={handleColorChecked} />} label="Black" />
                                <FormControlLabel control={<Checkbox value="white" onChange={handleColorChecked} />} label="White" />
                                <FormControlLabel control={<Checkbox value="gray" onChange={handleColorChecked} />} label="Gray" />
                                <FormControlLabel control={<Checkbox value="brown" onChange={handleColorChecked} />} label="Brown" />
                                <FormControlLabel control={<Checkbox value="blue" onChange={handleColorChecked} />} label="Blue" />
                                <FormControlLabel control={<Checkbox value="green" onChange={handleColorChecked} />} label="Green" />
                                <FormControlLabel control={<Checkbox value="purple" onChange={handleColorChecked} />} label="Purple" />
                                <FormControlLabel control={<Checkbox value="silver" onChange={handleColorChecked} />} label="Silver" />
                                <FormControlLabel control={<Checkbox value="gold" onChange={handleColorChecked} />} label="Gold" />
                                <FormControlLabel control={<Checkbox value="mixed" onChange={handleColorChecked} />} label="Mixed" />
                            </FormGroup>
                        </details-menu>
                    </details>
                </div>

                <div className='middleThird'>
                    {filteredProducts &&
                        filteredProducts.map((element) =>
                            <Card className='cardDesktop' >
                                <CardActionArea>
                                    <CardMedia
                                        className='cardPic'
                                        sx={{ objectFit: "contain" }}
                                        component="img"
                                        image={element.thumbnail}
                                        alt="picture of product"
                                        height="300"
                                    />
                                    <CardContent >
                                        <Typography gutterBottom variant="h5" component="div">
                                            {element.title}
                                        </Typography>
                                        <Typography variant="body2" color="error" >
                                            ${element.price}  <s style={{ color: "gray" }}>${Math.round(element.price * 1.25)}</s>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card >
                        )}
                </div>

                <div className='rightThird' />
            </div>
        </>
    )
}
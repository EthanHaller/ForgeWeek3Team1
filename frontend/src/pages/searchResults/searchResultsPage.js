import react, { useState, useEffect } from 'react';
import "./SearchResults.css"
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Button, Checkbox, FormGroup, FormControlLabel, Drawer, IconButton, TextField, MenuItem } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchResultsPage() {
    //useStates
    const params = useParams();
    const category = params.category;
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobilePriceFilter, setMobilePriceFilter] = useState([]);
    const [mobileColorFilter, setMobileColorFilter] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [whichSort, setWhichSort] = useState("Featured");
    const [whichMobileSort, setWhichMobileSort] = useState("Featured");



    useEffect(() => {
        getProducts()
    }, [category])
    //fetching product list
    async function getProducts() {
        if (category === "all") {
            await fetch("https://easybuy-7xer.onrender.com/products/get-products", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category: "?limit=100" })
            })
                .then((response) => response.json())
                .then((data) => setProducts(data))
        }

        else if (category.substring(0, 2) === "q=") {
            await fetch("https://easybuy-7xer.onrender.com/products/get-products", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category: "search?" + category })
            })
                .then((response) => response.json())
                .then((data) => setProducts(data))
        }
        else {
            await fetch("https://easybuy-7xer.onrender.com/products/get-products", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category: "category/" + category })
            })
                .then((response) => response.json())
                .then((data) => setProducts(data))
        }

    }
    //filtering price
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
    //filtering color
    function filterColor() {
        if (colorFilter.length > 0) {
            let temp = products.results.filter((product) => {
                if (!product.colors)
                    return false;
                return isRightColor(product)
            })
            if (priceFilter.length > 0) {
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
    //handling checkboxes
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

    //toggling mobile filter
    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen)
    }
    //handling mobile filter submission
    function handleSubmit() {
        if (mobilePriceFilter.length > 0)
            setPriceFilter(mobilePriceFilter);
        if (mobileColorFilter.length > 0)
            setColorFilter(mobileColorFilter);
        if (mobileColorFilter.length > 0 || mobilePriceFilter.length > 0)
            setIsFiltered(true);
        setWhichSort(whichMobileSort)
        toggleDrawer();
    }

    function handleMobilePriceChecked(e) {
        if (e.target.checked) {
            setMobilePriceFilter([...mobilePriceFilter, e.target.value]);
        }
        else {
            setMobilePriceFilter(mobilePriceFilter.filter((filter) => filter !== e.target.value));
        }
    }

    function handleMobileColorChecked(e) {
        if (e.target.checked) {
            setMobileColorFilter([...mobileColorFilter, e.target.value]);
        }
        else {
            setMobileColorFilter(mobileColorFilter.filter((filter) => filter !== e.target.value));
        }
    }

    //sorting
    function handleSort(e) {
        setWhichSort(e.target.value)
    }

    function handleMobileSort(e) {
        setWhichMobileSort(e.target.value);
        setIsFiltered(true);
    }
    return (
        <>
            <div>
                {category.substring(0, 2) === "q=" ? <h1>Searching For "{category.substring(2)}"</h1> :
                    category === "all" ? <h1>All Products</h1> :
                        <h1 style={{ textTransform: "capitalize" }}>{category}</h1>}
                {(filteredProducts && filteredProducts.length === 0) &&
                    <h2 style={{ textAlign: "center" }}>No Results</h2>}
            </div>

            <div className='structure'>
                <div className='leftThird' />

                <div className='leftThird' style={{ height: (filteredProducts && filteredProducts.length === 0) ? "400px" : "auto" }}>
                    <h1 style={{ textAlign: "left" }}>Filter/Sort</h1>
                    <TextField select
                        id='sorter'
                        name='sort'
                        label="Sort by:"
                        sx={{ marginBottom: "5%" }}
                        size='small'
                        defaultValue="Featured"
                        onChange={(e) => handleSort(e)}
                    >
                        <MenuItem value="Featured">Featured</MenuItem>
                        <MenuItem value="Price: low-high">Price: low-high</MenuItem>
                        <MenuItem value="Price: high-low">Price: high-low</MenuItem>
                    </TextField>
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
                        <div className='mobileFilter'>
                            <Button variant='contained'
                                sx={{ width: "100%", textTransform: "capitalize", fontWeight: "bold" }}
                                onClick={toggleDrawer}
                            >&emsp; Filter/Sort &emsp; {<SortIcon />}</Button>
                            <Drawer anchor='top'
                                open={isDrawerOpen}
                                onClose={toggleDrawer}
                            >
                                <div style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
                                    <div style={{ width: "100%" }}>
                                        <h3 style={{ textAlign: "left", marginLeft: "2%" }}>Filter/Sort</h3>
                                    </div>
                                    <IconButton onClick={toggleDrawer} sx={{ width: "fit-content" }}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                {isFiltered &&
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        sx={{ textTransform: "none", width: "fit-content", marginBottom: "3%" }}
                                        onClick={() => {
                                            setPriceFilter([]);
                                            setMobilePriceFilter([]);
                                            setColorFilter([]);
                                            setMobileColorFilter([]);
                                            setIsFiltered(false);
                                            setWhichMobileSort("Featured");
                                            setWhichSort("Featured");
                                            toggleDrawer();
                                        }}
                                    >Clear Filters</Button>}
                                <TextField select
                                    id='sorter'
                                    name='sort'
                                    label="Sort by:"
                                    sx={{ marginBottom: "5%" }}
                                    size='small'
                                    defaultValue={whichMobileSort}
                                    onChange={(e) => handleMobileSort(e)}
                                >
                                    <MenuItem value="Featured">Featured</MenuItem>
                                    <MenuItem value="Price: low-high">Price: low-high</MenuItem>
                                    <MenuItem value="Price: high-low">Price: high-low</MenuItem>
                                </TextField>
                                <details style={{ marginLeft: "2%" }}>
                                    <summary>Price</summary>
                                    <details-menu>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox value="30" onChange={handleMobilePriceChecked} />} label="$0-$30" />
                                            <FormControlLabel control={<Checkbox value="60" onChange={handleMobilePriceChecked} />} label="$30-$60" />
                                            <FormControlLabel control={<Checkbox value="90" onChange={handleMobilePriceChecked} />} label="$60-$90" />
                                            <FormControlLabel control={<Checkbox value="120" onChange={handleMobilePriceChecked} />} label="$90-$120" />
                                            <FormControlLabel control={<Checkbox value="upper" onChange={handleMobilePriceChecked} />} label="$120+" />
                                        </FormGroup>
                                    </details-menu>
                                </details>
                                <details style={{ marginTop: "7%", marginBottom: "7%", marginLeft: "2%" }}>
                                    <summary>Colors</summary>
                                    <details-menu>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox value="black" onChange={handleMobileColorChecked} />} label="Black" />
                                            <FormControlLabel control={<Checkbox value="white" onChange={handleMobileColorChecked} />} label="White" />
                                            <FormControlLabel control={<Checkbox value="gray" onChange={handleMobileColorChecked} />} label="Gray" />
                                            <FormControlLabel control={<Checkbox value="brown" onChange={handleMobileColorChecked} />} label="Brown" />
                                            <FormControlLabel control={<Checkbox value="blue" onChange={handleMobileColorChecked} />} label="Blue" />
                                            <FormControlLabel control={<Checkbox value="green" onChange={handleMobileColorChecked} />} label="Green" />
                                            <FormControlLabel control={<Checkbox value="purple" onChange={handleMobileColorChecked} />} label="Purple" />
                                            <FormControlLabel control={<Checkbox value="silver" onChange={handleMobileColorChecked} />} label="Silver" />
                                            <FormControlLabel control={<Checkbox value="gold" onChange={handleMobileColorChecked} />} label="Gold" />
                                            <FormControlLabel control={<Checkbox value="mixed" onChange={handleMobileColorChecked} />} label="Mixed" />
                                        </FormGroup>
                                    </details-menu>
                                </details>

                                <Button variant='contained' sx={{ textTransform: "none" }} onClick={handleSubmit}>Apply</Button>
                            </Drawer>
                        </div>}
                    {filteredProducts &&
                        filteredProducts.sort((a, b) => {
                            return whichSort === "Featured" ? a.order > b.order ? -1 : 1 : whichSort === "Price: low-high" ?
                                a.price > b.price ? 1 : -1 : whichSort === "Price: high-low" ? a.price < b.price ? 1 : -1 : -1
                        }).map((element) =>
                            <Card className='cardDesktop' component={Link} to={"/products/" + category + "/" + element.id}>
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
import "./ItemPage.css"
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Divider, TextField, MenuItem, Box, Card, CardContent, CardMedia, CardActionArea, Typography } from "@mui/material";
import Stars from "./Stars";

export default function ItemPage() {
    const [thisItem, setThisItem] = useState();
    const [otherItems, setOtherItems] = useState([]);
    const [currentBicPic, setCurrentBigPic] = useState();
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState();
    const [size, setSize] = useState();

    const params = useParams();
    const id = params.id;
    const category = params.category;

    async function getItem() {
        await fetch("http://localhost:9000/products/get-item", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
            .then((response) => response.json())
            .then((data) => {
                setThisItem(data)
                setCurrentBigPic(data.item.thumbnail)
            })
    }

    async function getOtherItems() {
        await fetch("http://localhost:9000/products/get-products", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: "category/" + category })
        })
            .then((response) => response.json())
            .then((data) => setOtherItems(data))
    }

    useEffect(() => {
        getItem();
        getOtherItems();

    }, [id])

    useEffect(() => {
        if (thisItem)
            if (thisItem.item.colors) {
                setColor(thisItem.item.colors[0])
            }
    }, [thisItem])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    function handleQuantity(e) {
        setQuantity(e.target.value);
    }

    function handleSize(e) {
        setSize(e.target.value);
    }

    return (
        <>
            {thisItem &&
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button style={{ marginTop: "3%", marginLeft: "13.5%", width: "fit-content", color: "gray", textTransform: "none" }}
                        component={Link} to={"/products/" + category}>{"< Back to Products"}</Button>
                    <div className="itemStructure">
                        <div className="halves">
                            <div className="quarter">
                                <img src={thisItem.item.thumbnail} className="smallPic" onClick={() => {
                                    setCurrentBigPic(thisItem.item.thumbnail);
                                }}
                                    style={{
                                        boxShadow: currentBicPic === thisItem.item.thumbnail ? "0 0 5px 8px #99a98F" : "none",
                                        border: currentBicPic === thisItem.item.thumbnail ? "none" : "groove"
                                    }} />
                                {thisItem.item.images.map((element) =>
                                    element === thisItem.item.thumbnail ? <p1></p1> :
                                        <img src={element} alt="Pictures of product" className="smallPic"
                                            onClick={() => {
                                                setCurrentBigPic(element);
                                            }}
                                            style={{ boxShadow: currentBicPic === element ? "0 0 5px 8px #99a98F" : "none", border: currentBicPic === element ? "none" : "groove" }} />
                                )}
                            </div>
                            <div className="mobileTitle">
                                <h2 style={{ textAlign: "left", marginTop: "0%" }}>{thisItem.item.title}</h2>
                                <h3 style={{ textAlign: "left", marginTop: "0%", display: "flex" }}>{thisItem.item.rating} {<Stars number={thisItem.item.rating} />}</h3>
                            </div>
                            <div className="imageArea">
                                <img src={currentBicPic} style={{ width: "100%" }} />
                            </div>
                            <div className="mobileQuarter">
                                <img src={thisItem.item.thumbnail} className="smallPic" onClick={() => {
                                    setCurrentBigPic(thisItem.item.thumbnail);
                                }}
                                    style={{
                                        boxShadow: currentBicPic === thisItem.item.thumbnail ? "0 0 5px 8px #99a98F" : "none",
                                        border: currentBicPic === thisItem.item.thumbnail ? "none" : "groove"
                                    }} />
                                {thisItem.item.images.map((element) =>
                                    element === thisItem.item.thumbnail ? <p1></p1> :
                                        <img src={element} alt="Pictures of product" className="smallPic"
                                            onClick={() => {
                                                setCurrentBigPic(element);
                                            }}
                                            style={{ boxShadow: currentBicPic === element ? "0 0 5px 8px #99a98F" : "none", border: currentBicPic === element ? "none" : "groove" }} />
                                )}
                            </div>
                        </div>
                        <div className="halves">
                            <div className="halves" style={{ marginLeft: "5%", flexDirection: "column" }}>
                                <div className="desktopTitle">
                                    <h2 style={{ textAlign: "left", marginTop: "0%" }}>{thisItem.item.title}</h2>
                                    <h3 style={{ textAlign: "left", marginTop: "0%", display: "flex" }}>{thisItem.item.rating} {<Stars number={thisItem.item.rating} />}</h3>
                                    <Divider sx={{ width: "90%", backgroundColor: "gray" }} />
                                </div>
                                <h3 style={{ color: "red", textAlign: "left", marginTop: "0%", height: "min-content" }}
                                >
                                    -25% <h3 style={{ color: "black", textAlign: "left", marginTop: "0%" }}>
                                        ${thisItem.item.price}
                                        <h5 style={{ color: "gray", textAlign: "left", marginTop: "0%" }}>Was <s>${Math.round(thisItem.item.price * 1.25)}</s></h5>
                                    </h3>
                                </h3>
                                {thisItem.item.colors &&
                                    <div>
                                        <h4 style={{ textAlign: "left", marginTop: "0%", textTransform: "capitalize" }}>Color: {color}</h4>
                                        <div style={{ display: "flex" }}>
                                            {thisItem.item.colors.map((element) =>
                                                <Box
                                                    className="boxes"
                                                    sx={{
                                                        backgroundColor: element, height: "auto",
                                                        aspectRatio: "1", width: "10%", marginLeft: "3%",
                                                        boxShadow: color === element ? "0 0 5px 5px #99a98F" : "none", border: color === element ? "none" : "groove"
                                                    }}
                                                    onClick={() => {
                                                        setColor(element);
                                                    }}
                                                ></Box>
                                            )}
                                        </div>
                                    </div>}
                                {thisItem.item.sizes &&
                                    <TextField
                                        select label="Size:"
                                        defaultValue={thisItem.item.sizes[0]}
                                        sx={{ marginTop: "10%", width: "50%", textTransform: "capitalize" }}
                                        onChange={handleSize}
                                    >
                                        {thisItem.item.sizes.map((element) =>
                                            <MenuItem value={element} sx={{ textTransform: "capitalize" }}>{element}</MenuItem>
                                        )}
                                    </TextField>}
                                <h3 style={{ textAlign: "left", marginBottom: "0%" }}>Description</h3>
                                <h3 style={{ textAlign: "left", marginTop: "0%", fontWeight: "normal" }}>{thisItem.item.description}</h3>
                            </div>
                            <div className="halves" style={{ marginTop: "0%" }}>
                                <div className="halves" style={{ border: "groove", display: "flex", flexDirection: "column", height: "fit-content" }}>
                                    <h2 style={{ marginLeft: "5%", textAlign: "left" }}>${thisItem.item.price}</h2>
                                    {thisItem.item.stock > 9 ?
                                        <h3 style={{ marginLeft: "5%", textAlign: "left", color: "#1b5e20", marginTop: "0%" }}>In Stock</h3> :
                                        <h3 style={{ marginLeft: "5%", textAlign: "left", color: "red", marginTop: "0%" }}>Only {thisItem.item.stock} Left</h3>
                                    }
                                    <TextField select sx={{ width: "fit-content", marginLeft: "5%" }} size="small" defaultValue="1" onChange={handleQuantity}>
                                        <MenuItem value="1">Qty: 1</MenuItem>
                                        <MenuItem value="2">Qty: 2</MenuItem>
                                        <MenuItem value="3">Qty: 3</MenuItem>
                                        <MenuItem value="4">Qty: 4</MenuItem>
                                        <MenuItem value="5">Qty: 5</MenuItem>
                                        <MenuItem value="6">Qty: 6</MenuItem>
                                        <MenuItem value="7">Qty: 7</MenuItem>
                                        <MenuItem value="8">Qty: 8</MenuItem>
                                    </TextField>
                                    <Button variant="contained"
                                        sx={{ marginTop: "5%", borderRadius: "100px", width: "90%", marginLeft: "auto", marginRight: "auto" }}
                                    >Add to Cart</Button>
                                    <h6 style={{ textAlign: "left", marginLeft: "5%" }}>Sold by {thisItem.item.brand}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    {otherItems.results &&
                        <div style={{ width: "66%", margin: "auto", marginTop: "5%" }}>
                            <Divider sx={{ backgroundColor: "gray" }} />
                            <h2>You Might Like:</h2>
                            <div className="otherItems">
                                {otherItems.results.map((element) =>
                                    element.id !== thisItem.item.id &&
                                    <Card className='otherItemsCards' component={Link} to={"/products/" + element.category + "/" + element.id}>
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
                        </div>}
                </div>}

        </>
    )
}
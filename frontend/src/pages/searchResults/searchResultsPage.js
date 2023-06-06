import react, { useState, useEffect } from 'react';
import "./SearchResults.css"
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea, CardActions, Typography } from '@mui/material';

export default function SearchResultsPage({ filters }) {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        getProducts()
    }, [])
    async function getProducts() {
        await fetch("http://localhost:9000/products/get-products", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: filters })
        })
            .then((response) => response.json())
            .then((data) => setProducts(data))
    }

    return (
        <>
            <div className='topArea'>
                <h1>{filters}</h1>
            </div>

            <div className='structure'>
                <div className='leftThird' />

                <div className='leftThird'>
                    <h1>text image</h1>
                </div>

                <div className='middleThird'>
                    {products.results &&
                        products.results.map((element) =>
                            <Card className='cardDesktop'>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={element.thumbnail}
                                        alt="picture of product"
                                        height="200"
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
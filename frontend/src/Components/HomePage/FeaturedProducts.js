import React, { useState, useEffect } from 'react';
import { styled } from "@mui/system";
import { Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { Link } from 'react-router-dom';
const StyledFeaturedProducts = styled('section')({
  marginTop: '4rem',
});

const ProductCard = styled(Card)({
  width: '300px',
  marginLeft: '2rem',
  marginRight: '2rem',
  marginTop: '4rem',
  marginBottom: '4rem'
});

const FeaturedProducts = () => {

  const [itemOne, setItemOne] = useState();
  const [itemTwo, setItemTwo] = useState();
  const [itemThree, setItemThree] = useState();

  async function getItems() {
    await fetch("https://easybuy-7xer.onrender.com/products/get-item", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: (Math.floor(Math.random() * 100 + 1)) })
    })
      .then((response) => response.json())
      .then((data) => setItemOne(data))
    await fetch("https://easybuy-7xer.onrender.com/products/get-item", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: (Math.floor(Math.random() * 100 + 1)) })
    })
      .then((response) => response.json())
      .then((data) => setItemTwo(data))
    await fetch("https://easybuy-7xer.onrender.com/products/get-item", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: (Math.floor(Math.random() * 100 + 1)) })
    })
      .then((response) => response.json())
      .then((data) => setItemThree(data))
  }

  useEffect(() => {
    getItems();
  }, [])

  return (
    <>
      {itemThree &&
        <StyledFeaturedProducts>
          <Typography variant="h2" align="center">Featured Products</Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <ProductCard>
                <CardActionArea component={Link} to={"/products/" + itemOne.item.category + "/" + itemOne.item.id}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={itemOne.item.thumbnail}
                    alt="Product 1"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {itemOne.item.title}
                    </Typography>
                    <Typography variant="body2" color="red">
                      ${itemOne.item.price}  <s style={{ color: "gray" }}>${Math.round(itemOne.item.price * 1.25)}</s>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </ProductCard>
            </Grid>
            <Grid item>
              <ProductCard>
                <CardActionArea component={Link} to={"/products/" + itemTwo.item.category + "/" + itemTwo.item.id}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={itemTwo.item.thumbnail}
                    alt="Product 2"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {itemTwo.item.title}
                    </Typography>
                    <Typography variant="body2" color="red">
                      ${itemTwo.item.price}  <s style={{ color: "gray" }}>${Math.round(itemTwo.item.price * 1.25)}</s>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </ProductCard>
            </Grid>
            <Grid item>
              <ProductCard>
                <CardActionArea component={Link} to={"/products/" + itemThree.item.category + "/" + itemThree.item.id}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={itemThree.item.thumbnail}
                    alt="Product 3"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {itemThree.item.title}
                    </Typography>
                    <Typography variant="body2" color="red">
                      ${itemThree.item.price}  <s style={{ color: "gray" }}>${Math.round(itemThree.item.price * 1.25)}</s>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </ProductCard>
            </Grid>
          </Grid>
        </StyledFeaturedProducts>
      }
    </>
  );
};

export default FeaturedProducts;

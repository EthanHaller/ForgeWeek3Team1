import React from 'react';
import { styled } from "@mui/system";
import { Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";

const StyledFeaturedProducts = styled('section')({
  marginTop: '4rem',
});

const ProductCard = styled(Card)({
  width: '300px',
  margin: '5rem',
});

const FeaturedProducts = () => {
  return (
    <StyledFeaturedProducts>
      <Typography variant="h2" align="center">Featured Products</Typography>
      <Grid container justifyContent="center">
        <Grid item>
          <ProductCard>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image="https://mixed-news.com/en/wp-content/uploads/2023/06/apple_vision_pro-1200x672.png"
                alt="Product 1"
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  Vision Pro
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </CardContent>
            </CardActionArea>
          </ProductCard>
        </Grid>
        <Grid item>
          <ProductCard>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image="https://www.pngmart.com/files/22/iPhone-14-PNG-Transparent.png"
                alt="iPhone 14"
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  iPhone 14
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </CardContent>
            </CardActionArea>
          </ProductCard>
        </Grid>
        <Grid item>
          <ProductCard>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image="https://atlas-content-cdn.pixelsquid.com/assets_v2/246/2468938011518178390/jpeg-600/G03.jpg?modifiedAt=1"
                alt="Product 3"
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  AirPods
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </CardContent>
            </CardActionArea>
          </ProductCard>
        </Grid>
      </Grid>
    </StyledFeaturedProducts>
  );
};

export default FeaturedProducts;

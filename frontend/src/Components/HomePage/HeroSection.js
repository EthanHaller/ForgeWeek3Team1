import React from 'react';
import { styled } from "@mui/system";
import { Typography, Button, Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import logo from './logo.png';

const StyledHeroSection = styled('section')({
  backgroundColor: "#CCD5AE",
  padding: '5rem',
});

const CenteredContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});


const HeroSection = () => {
  return (
    <StyledHeroSection>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <div style={{ marginTop: '2rem' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', sm: '3rem' } }} align="left" fontWeight="bold">
              Discover a wide range of products for all your needs.
            </Typography>
            <div style={{ marginTop: '2rem' }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} align="left">
                Welcome to EasyBuy, your ultimate destination for all your shopping needs. We offer a wide range of high-quality products that cater to every aspect of your life. Explore our extensive collection of electronics, fashion, home essentials, beauty products, and much more.
              </Typography>
            </div>
            <Button variant="contained" color="primary" style={{ marginTop: '2rem' }} component={Link} to={"/products/all"}>
              Shop Now
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <CenteredContainer>
            <img src={logo} alt="Product images" style={{ maxWidth: '100%' }} />
          </CenteredContainer>
        </Grid>
      </Grid>
    </StyledHeroSection>
  );
};

export default HeroSection;

import React from 'react';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import Testimonials from './Testimonials';

const HomePage = () => {
    return (
      <div>
          <HeroSection />
        <FeaturedProducts />
        <Testimonials />
      </div>
    );
  };
  
  export default HomePage;
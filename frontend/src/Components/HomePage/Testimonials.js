import React from 'react';
import { styled } from "@mui/system";
import { Divider } from "@mui/material";

const StyledHeroSection = styled('section')({
  backgroundColor: "#FEFAE0",
  padding: '4rem',
});

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      review: "Great products and excellent customer service. Highly recommended!",
      image: "https://www.svgrepo.com/show/382102/male-avatar-boy-face-man-user-8.svg"
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "I'm really satisfied with my purchase. The quality is top-notch.",
      image: "https://e7.pngegg.com/pngimages/122/453/png-clipart-computer-icons-user-profile-avatar-female-profile-heroes-head.png",
    },
    {
      id: 3,
      name: "Samuel Johnson",
      review: "EasyBuy has been my go-to online store for years. They never disappoint!",
      image: "https://img.favpng.com/17/0/22/customer-computer-icons-management-company-trade-png-favpng-t7DTm6RhaukutHDzfunh17sTD.jpg",
    },
  ];

  const TestimonialGrid = styled('div')({
    display: 'grid',
    gap: '1rem',

    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  });

  const TestimonialItem = styled('div')({
    textAlign: 'center',

    '& > div': {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      margin: '0 auto',
      position: 'relative',
    },

    '& h3': {
      marginTop: '1rem',
    },
  });

  const TestimonialImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  });

  return (
    <StyledHeroSection>
      <Divider sx={{ marginBottom: "3%", backgroundColor: "gray" }} />
      <section className="testimonials">
        <TestimonialGrid>
          {testimonials.map((testimonial) => (
            <TestimonialItem key={testimonial.id} className="testimonial-item">
              <div>
                <TestimonialImage src={testimonial.image} alt={testimonial.name} />
              </div>
              <h3>{testimonial.name}</h3>
              <p>"{testimonial.review}"</p>
            </TestimonialItem>
          ))}
        </TestimonialGrid>
      </section>
    </StyledHeroSection>
  );
};

export default Testimonials;

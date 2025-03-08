import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { keyframes } from '@mui/system';
import { servicesData } from "../utility/data"; // Import the service data

// Card hover animation (zoom-in effect)
const cardHover = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;



const ServiceCards = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const titleRef = useRef(null);

  // Event listener to handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        // Check if the title is in the viewport
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setIsTitleVisible(true);
        } else {
          setIsTitleVisible(false);
        }
      }
    };

    // Adding event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        py: 10,
        bgcolor: '#333333', // Deep gray background for the section
        color: '#FFFFFF', // White text for contrast and readability
        textAlign: 'center',
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Title with fade-in effect triggered by scroll */}
      <Typography
        variant="h4"
        sx={{
          mb: 6,
          fontWeight: 'bold',
          fontSize: '36px',
          color: '#FF6347', // Tomato red for the title
          opacity: isTitleVisible ? 1 : 0, // Only visible when in the viewport
          transform: isTitleVisible ? 'translateY(0)' : 'translateY(30px)', // Slide effect
          transition: 'opacity 1s ease-out, transform 1s ease-out', // Smooth transition for title
        }}
        ref={titleRef}
      >
        See Our Services
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 6,
          flexWrap: 'wrap',
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        {servicesData.map((service, index) => (
          <Card
            key={index}
            sx={{
              width: 300,
              bgcolor: '#444444', // Dark gray background for the card
              transition: 'transform 0.3s, box-shadow 0.3s', // Add transition for hover effect
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 8,
                animation: `${cardHover} 0.3s ease-out`, // Zoom-in effect on hover
              },
              borderRadius: 3,
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
            }}
          >
            {/* Image inside the card */}
            <img
              src={service.imagepath}
              alt={service.title}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#FF6347', // Tomato red for the service title
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: '#D3D3D3', // Light gray for description text
                  lineHeight: 1.6,
                }}
              >
                {service.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Learn More Button */}
      <Box sx={{ mt: 6 }}>
      <Button
        variant="contained"
        color="error"
        href="#learn-more"
        sx={{
          padding: '10px 25px',
          borderRadius: '50px',
          backgroundColor: '#FF6347', // Tomato red button
          transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: '#E74C3C', // Darker tomato red on hover
            transform: 'scale(1.1)', // Smooth scale-up effect
           },
          }}
      >
        Learn More
      </Button>
      </Box>
    </Box>
  );
};

export default ServiceCards;

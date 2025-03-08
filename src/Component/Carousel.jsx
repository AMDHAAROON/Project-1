import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";
import { slides } from "../utility/data";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Navbar from "../Component/Navbar"; // Import Navbar

const AUTO_PLAY_INTERVAL = 3500;
const TRANSITION_DURATION = 3000;

const progressAnimation = keyframes`
    from {
      height: 0%;
    }
    to {
      height: 100%;
    }
  `;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const theme = useTheme();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, AUTO_PLAY_INTERVAL);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#eee",
        fontFamily: "Poppins, sans-serif",
        fontSize: "12px",
        margin: 0,
        position: "relative",
        height: "100vh",
        backgroundImage: "url('/Assets/back.png')", // Updated path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        [theme.breakpoints.down("sm")]: {
          height: "90vh",
        },
      }}
    >
      {/* Navbar on Top of Carousel */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 1000, // Ensure it's above the images
        }}
      >
        <Navbar color="#fff" />
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Change direction to column
            transition: "transform 0.5s ease-in-out",
            height: "100%",
            transform: `translateY(-${currentIndex * 100}%)`, // Move vertically
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                minHeight: "100%",
                width: "100%",
                position: "relative",
              }}
            >
              {/* Static Background Image, Text, and Floating Images */}
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: "15%", md: "30%" },
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "90%", md: "80%" },
                  paddingRight: { xs: 0, md: "30%" },
                  color: "#fff",
                  textShadow: "0 5px 10px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: 1.8,
                    fontFamily: "Lora, serif",
                    color: "#ff6f61", // Muted coral color by default
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    color: "#ff6f61", // Muted coral color by default
                    fontFamily: "Lora, serif",
                  }}
                >
                  {slide.topic}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    marginTop: "20px",
                    lineHeight: "1.5em",
                   // A subtle light tan color by default
                  }}
                >
                  {slide.des}
                </Typography>
                <Box sx={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowCircleRightIcon />}
                    href={slide.path}
                    sx={{
                      background: `linear-gradient(91.83deg, rgb(255, 81, 47) 0%, rgb(221, 36, 118) 100%)`,
                      textTransform: "none",
                      borderRadius: "50px",
                      fontSize: "1rem",
                      px: [4],
                      color: "#fff",
                      zIndex: 1,
                      border: "2px solid transparent",
                    }}
                  >
                    See More
                  </Button>
                </Box>
              </Box>

              {/* Floating Image */}
              <Box
                component="img"
                src={slide.floatingImg} // Use a floating image from the slides data
                alt="Floating Illustration"
                sx={{
                  position: "absolute",
                  right: "15%",
                  top: "30%",
                  width: { xs: "60%", md: "70%" },
                  maxWidth: "300px",
                  transition: "all 0.3s ease-in-out",
                  [theme.breakpoints.down("sm")]: {
                    top: "unset",
                    right: "unset",
                    bottom: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "65%",
                  },
                }}
              />
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 100,
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: "12px",
                height: "12px",
                backgroundColor: index === currentIndex ? "#FF6F61" : "#fff",
                borderRadius: "50%",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            position: "absolute",
            zIndex: 1000,
            width: "3px",
            height: "100%",
            backgroundColor: "#333",
            right: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#f1683a",
              animation: `${progressAnimation} ${AUTO_PLAY_INTERVAL}ms linear infinite`,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Carousel;

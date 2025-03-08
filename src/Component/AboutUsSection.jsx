import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { aboutUsImage } from "../utility/data"; // Import the image path
import { Link } from "react-router-dom";

const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  const handleScroll = () => {
    if (textRef.current) {
      const { top, bottom } = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Trigger animation when the section is within the viewport
      if (top < windowHeight * 0.8 && bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount in case it's already visible

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "400px",
        background: `url(${aboutUsImage}) center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Content with Scroll Animation */}
      <Box
        ref={textRef}
        sx={{
          position: "relative",
          textAlign: "center",
          color: "white",
          maxWidth: "800px",
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#FF6347",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          Who We Are
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: "#D3D3D3",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease 0.2s",
          }}
        >
          We are a team driven by passion, innovation, and excellence. Our
          mission is to create meaningful experiences, foster collaboration,
          and bring visionary ideas to life. With a commitment to quality and
          creativity, we strive to make a lasting impact in everything we do.
        </Typography>

        <Button
          component={Link}
          to="/about-us"
          variant="contained"
          sx={{
            backgroundColor: "#FF6347",
            color: "white",
            fontWeight: "bold",
            borderRadius: "20px",
            px: 4,
            py: 1,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease 0.4s",
            "&:hover": {
              backgroundColor: "#E74C3C",
            },
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUsSection;

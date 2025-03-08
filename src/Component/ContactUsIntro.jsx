import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { contactImage } from "../utility/data"; // Import the image path
import { Link } from "react-router-dom";

const ContactUsIntro = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("contact-us-intro");
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      id="contact-us-intro"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        px: { xs: 2, md: 10 },
        py: 5,
        backgroundColor: "#333333",
      }}
    >
      {/* Left Side - Image */}
      <Box
        sx={{
          flex: 1,
          background: `url(${contactImage}) center/cover no-repeat`,
          height: { xs: "250px", md: "400px" },
          width: "100%",
          borderRadius: "12px",
        }}
      ></Box>

      {/* Right Side - Content */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: "center", md: "left" },
          color: "white",
          p: { xs: 3, md: 5 },
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(50px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, color: "#FF6347" }}
        >
          Get in Touch
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#D3D3D3" }}>
          Have questions or need assistance? We’re here to help! Reach out to us
          for inquiries, collaborations, or any information you need. Let’s
          connect and make something great together!
        </Typography>
        <Button
          component={Link}
          to="/contact-us"
          variant="contained"
          sx={{
            backgroundColor: "#FF6347",
            color: "white",
            fontWeight: "bold",
            borderRadius: "20px",
            px: 4,
            py: 1,
            "&:hover": {
              backgroundColor: "#E74C3C",
            },
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default ContactUsIntro;

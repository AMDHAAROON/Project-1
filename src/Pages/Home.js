import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ bgcolor: "#000212" }}>
        <Navbar color="#fff" />
      </Box>
      <Box sx={{ flex: 1, pt: 10 }}> {/* Add padding top */}
        {/* Main content goes here */}
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
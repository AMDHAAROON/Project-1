import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer"
import { Box } from "@mui/material";
const Home = () => {
  return (
    <>
      <Box sx={{ bgcolor: "#000212" }}>
       
        <Navbar color="#fff" />
      </Box>
      <Box sx={{pt:'10' }}>
      <Footer/>
      </Box>
    </>
  );
};

export default Home;
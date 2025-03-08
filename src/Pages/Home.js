import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Carousel from "../Component/Carousel";
import Service from "../Component/ServiceCards";
import About from "../Component/AboutUsSection";
import Contact from "../Component/ContactUsIntro";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
          <Navbar color="#333" /> {/* Dark navbar for contrast */}
        </Box>
        <Carousel />
      </Box>

   <Box>
    <Service />
   </Box>
   <Box >
    <Contact />
    </Box>
   <Box>
    <About />
   </Box>
   

      <Box sx={{ mt: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;

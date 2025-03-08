import * as React from "react";
import { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  Drawer,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Stack,
  useScrollTrigger,
  Slide,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Component to hide AppBar on scroll
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar(props) {
  // State variables
  const [isDown, setIsDown] = useState(false); // Tracks scroll position
  const [mobileOpen, setMobileOpen] = useState(false); // Controls mobile drawer state
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // Checks if screen size is medium or larger
  const navigate = useNavigate();

  // Effect to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsDown(window.scrollY >= 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  // Function to handle navigation clicks
  const handleNavClick = (link) => {
    navigate(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  // Navigation items
  const navItems = [
    { link: "/", name: "Home" },
    { link: "/", name: "Services" },
    { link: "/", name: "About Us" },
    { link: "/", name: "Contact Us" },
    { link: "/gallery", name: "Gallery" },
  ]; // Remove falsy values

  // Drawer component for mobile navigation
  const drawer = (
    <Stack direction="column" sx={{ width: "100vw", height: "100vh", bgcolor: "#181818" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}>
        <IconButton onClick={() => setMobileOpen(false)}>
          <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Toolbar>
      <List sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        {navItems.map((item, index) => (
          <ListItem button key={index} onClick={() => handleNavClick(item.link)} sx={{ justifyContent: "center" }}>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: "bold", fontSize: "1.3rem", color: "#fff", textAlign: "center" }}>
                  {item.name}
                </Typography>
              }
            />
          </ListItem>
        ))}
     
      </List>
    </Stack>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: isDown ? "rgba(255, 255, 255, 0.6)" : "transparent",
            backdropFilter: isDown ? "blur(10px)" : "none",
            boxShadow: isDown ? 3 : 0,
            borderRadius: isDown ? "0 0 2rem 2rem" : "0",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Logo */}
            <ImageListItem onClick={() => handleNavClick("/")} style={{ cursor: "pointer" }}>
              <Box component="img" src="/Assets/icon.png" sx={{ width: { xs: "50px", sm: "50px" }, height: "auto", ml: 2 }} alt="logo" />
            </ImageListItem>
         
           
            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1rem" }}>
              {navItems.map((item, index) => (
                <Button key={index} onClick={() => handleNavClick(item.link)} sx={{ fontSize: "1rem", fontWeight: "600", color: isDown ? "#000" : "#fff" }}>
                  {item.name}
                </Button>
              ))}
            
            </Box>
            {/* Mobile Navigation Button */}
            <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={() => setMobileOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {drawer}
      </Drawer>
    </>
  );
}
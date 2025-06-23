import React from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { purple } from "@mui/material/colors";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  display: "block",
  marginBottom: "0.5rem",
  "&:hover": {
    textDecoration: "underline",
  },
  "&.active": {
    fontWeight: "bold",
    textDecoration: "underline",
  },
}));
import { color, styled } from "@mui/system";
import { MailruIcon } from "react-share";
import ScrollToTop from "./Scrolltop";
import { Link, NavLink } from "react-router-dom";
export default function Footer() {
  const paymentIcons = [
    {
      name: "Visa",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    },
    {
      name: "Mastercard",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    },
    {
      name: "Meeza",
      src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Meeza_Logo.png",
    },
    {
      name: "PayPal",
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
  ];
  return (
    <Box
      className="footer"
      component="footer"
      sx={{
        backgroundColor: purple[900],
        py: 1,
        color: "white",
        paddingTop: "20px",
      }}
    >
      <Container maxWidth="lg">
        {/* Top Footer: Newsletter and Social */}
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          {/* Newsletter Signup */}
          <Grid container spacing={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Sign up to our newsletter
            </Typography>
            <Box sx={{ display: "flex", maxWidth: 400 }}>
              <TextField
                name="email"
                type="email"
                placeholder="Your email address"
                required
                variant="outlined"
                size="small"
                sx={{
                  outline: "none",
                  flexGrow: 1,
                  border: "2px solid white",
                  borderRadius: "20px",
                  color: "white",
                  "& .MuiOutlinedInput-input": {
                    backgroundColor: "transparent !important",
                  },
                  "& input::placeholder": {
                    color: "white", // لون البليس هولدر
                    opacity: 1, // تأكد إنها ظاهرة كويس
                  },
                }}
                inputProps={{ "aria-label": "Your email address" }}
              />
              <Button
                variant="contained"
                color="white"
                size="small"
                sx={{
                  ml: 1,
                  backgroundColor: "black",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>

          {/* Social Media Icons */}
          <Grid container spacing={2}>
            <Box>
              <IconButton
                sx={{ color: "white" }}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                color="white"
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                color="white"
              >
                <TwitterIcon fontSize="large" />
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                color="white"
              >
                <InstagramIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Know Us
              </Typography>
              <StyledNavLink to="/aboutus">About Us</StyledNavLink>
              <StyledNavLink to="/privcy">Privacy Policy</StyledNavLink>
              <StyledNavLink to="/terms">Terms & Conditions</StyledNavLink>
              <StyledNavLink to="/services">Our Services</StyledNavLink>
            </Grid>
            {/* Column 2 */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ color: "white" }}>
              <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                Guarantee
              </Typography>

              <StyledNavLink to="/policy">Return policy</StyledNavLink>
            </Grid>

            {/* Column 3 */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                FAQ & Locator
              </Typography>
              <StyledNavLink to="/fqa">FAQ</StyledNavLink>
              <StyledNavLink to="/locator">Store Locator</StyledNavLink>

              <StyledNavLink to="/ContactUs">Contact Us</StyledNavLink>
            </Grid>

            {/* Column 4 */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                Contact Info
              </Typography>
              <Typography
                sx={{ display: "flex", gap: "2px", alignItems: "center" }}
              >
                {" "}
                <CallIcon></CallIcon> <Typography>23450</Typography>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "2px",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <EmailIcon /> <Typography>arwa.ragb22@gmail.com</Typography>
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "30px" }}>
            <Grid container spacing={2} alignItems="center">
              {paymentIcons.map((icon) => (
                <Grid key={icon.name}>
                  <Box
                    component="img"
                    src={icon.src}
                    alt={icon.name}
                    sx={{
                      height: 25,
                      width: "auto",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      <Divider sx={{ backgroundColor: "white" }} />
      <Typography
        sx={{
          margin: "10px auto",
          textAlign: "center",
          fontSize: { xs: "15px", md: "18px" },
        }}
      >
        Copyright © 2025 Arwa Furnish, Inc. All rights reserved.
      </Typography>
      <ScrollToTop />
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, useTheme, Skeleton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { preload } from "react-dom";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: { xs: "auto", md: "74vh" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        px: 1, // horizontal padding
      }}
    >
      {/* Text Content Section */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: "center", md: "center" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mx: "auto",
          py: 4,
          textalign: "center",
          px: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "20px", md: "35px" },
          }}
        >
          Elegant Furniture That Complements Your Home
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            fontSize: "17px",
            fontWeight: 500,
          }}
        >
          Explore our curated selection of modern and comfortable furniture,
          designed to add beauty and warmth to every corner of your home.
        </Typography>

        <Button
          onClick={() => navigate("/cat")}
          variant="contained"
          endIcon={<ShoppingCartIcon />}
          sx={{
            color: theme.palette.primary.contrastText,
            padding: "10px 24px",
            borderRadius: "30px",
            fontSize: "1rem",
          }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          flex: 1,
          positio: "relative",
          mt: { xs: 4, md: 0 },
          width: { xs: "100%", md: "auto" },
        }}
      >
        <img
          className="img-hero"
          loading="lazy"
          src="/lan.jpg"
          alt="Furniture"
          style={{
            width: "100%",

            maxWidth: "100%",
            height: "400px",
          }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage;

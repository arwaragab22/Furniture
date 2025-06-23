import React, { useState } from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productsall from "../most.json";
import { producttype } from "../type";
import Product from "./Product/Product";
import { Bounce, ToastContainer } from "react-toastify";

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

const BestSellingSlider = () => {

  const [products, setproducts] = useState<producttype[]>(productsall.products);


  return (
    <Box sx={{ p: 5, backgroundColor: "#f8f8f8" }}>
      <Typography variant="h4" textAlign="center" fontWeight={600} mb={4}>
        Best Sellers
      </Typography>

      <Slider {...settings}>
        {products.map((product, idx) => (
          <Box sx={{ height: { xs: "auto", md: "390px" } }} key={product.title}>
            <Product
              productfurniture={product}
              islikedproduct={false}
            ></Product>
          </Box>
        ))}
      </Slider>

      <style>{`
  .slick-prev:before, .slick-next:before {
    color: #800080;
    font-size: 40px;
  }

  .slick-dots li button:before {
    color: #800080;
  }

  .slick-slide > div {
    height: 100%;
  }

  .slick-prev {
    left: -42px;
  }

  .MuiPaper-root {
    height: 100%;
  }

  @media (max-width: 600px) {
    .slick-prev:before, .slick-next:before {
      font-size: 28px;
    }
      .slick-dots{
      display:none!important
      }
  }
`}</style>
    </Box>
  );
};

export default BestSellingSlider;

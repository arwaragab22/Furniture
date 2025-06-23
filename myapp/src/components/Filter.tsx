import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const categories = [
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Kids Room",
  "Kitchen",
  "Bathroom",
  "Garden",
  "Office",
];

const demoProducts = [
  { id: 1, name: "Sofa", category: "Living Room", price: 3000, sold: 100 },
  { id: 2, name: "Bed", category: "Bedroom", price: 5000, sold: 150 },
  { id: 3, name: "Desk", category: "Office", price: 2500, sold: 60 },
  { id: 4, name: "Table", category: "Dining Room", price: 2000, sold: 80 },
];

const ProductFilterPage = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [sortOption, setSortOption] = useState("");

  // const toggleCategory = (cat) => {
  //   setSelectedCategories((prev) =>
  //     prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
  //   );
  // };

  const toggleSortOption = (option) => {
    setSortOption((prev) => (prev === option ? "" : option));
  };

  const filterProducts = () => {
    let filtered = [...demoProducts];
    if (selectedCategories.length) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (sortOption === "high") filtered.sort((a, b) => b.price - a.price);
    else if (sortOption === "low") filtered.sort((a, b) => a.price - b.price);
    else if (sortOption === "sold") filtered.sort((a, b) => b.sold - a.sold);
    return filtered;
  };

  const FilterSidebar = (
    <Box p={2} width={250}>
      <Typography variant="h6">Filter by Category</Typography>
      <FormGroup>
        {categories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
            }
            label={cat}
          />
        ))}
      </FormGroup>
      <Typography variant="h6" mt={2}>
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={6000}
      />
      <Typography variant="h6" mt={2}>
        Sort By
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={sortOption === "high"}
              onChange={() => toggleSortOption("high")}
            />
          }
          label="Price: High to Low"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sortOption === "low"}
              onChange={() => toggleSortOption("low")}
            />
          }
          label="Price: Low to High"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sortOption === "sold"}
              onChange={() => toggleSortOption("sold")}
            />
          }
          label="Most Sold"
        />
      </FormGroup>
      {isMobile && (
        <Button
          variant="contained"
          onClick={() => setOpenDrawer(false)}
          fullWidth
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );

  return (
    <Box display="flex">
      {isMobile ? (
        <>
          <IconButton onClick={() => setOpenDrawer(true)}>
            <FilterListIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            {FilterSidebar}
          </Drawer>
        </>
      ) : (
        <Box>{FilterSidebar}</Box>
      )}
      <Box p={2} flex={1}>
        <Typography variant="h5" gutterBottom>
          Products
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          gap={2}
        >
          {filterProducts().map((product) => (
            <Box
              key={product.id}
              p={2}
              border="1px solid #ccc"
              borderRadius="10px"
            >
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Category: {product.category}</Typography>
              <Typography>Price: {product.price} EGP</Typography>
              <Typography>Sold: {product.sold}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFilterPage;

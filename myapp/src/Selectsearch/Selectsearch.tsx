import React, { useState } from "react";
import { Box, Select, MenuItem, InputLabel, FormControl, type SelectChangeEvent } from "@mui/material";
import { grey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
const categories: string[] = [
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Kids Room",
  "Kitchen",
  "Bathroom",
  "Garden",
  "Office",
];type SelectsearchProps = {
  setsearchcat: (val:string) => void;
};

const Selectsearch: React.FC<SelectsearchProps> = ({ setsearchcat}) => {
  const [value, setValue] = useState("ALL");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    setsearchcat(event.target.value as string);

  };

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: 120,
        height: "40px",
        display: { xs: "none", md: "flex" },
      }}
    >
      <Select
        variant="filled"
        sx={{
          backgroundColor: grey[300],
          borderRadius: "0px",
          "&:hover": {
            backgroundColor: grey[300],
          },
          height: "100%",
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Category"
        onChange={handleChange}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          // disablePortal: true, // ممكن تجربها لو ما اشتغلتش
        }}
      >
        <MenuItem value={"ALL"}>All</MenuItem>

        {categories.map((category: string, index: number) => (
  
        
              <MenuItem value={category}>{category}</MenuItem>
        
    
        ))}
      </Select>
    </FormControl>
  );
};

export default Selectsearch;

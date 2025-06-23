import React from "react";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { grey, purple } from "@mui/material/colors";

const categories: string[] = [
  
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Kids Room",
  "Kitchen",
  "Bathroom",
  "Garden",
  "Office",
];
const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];
type propstype = {
  handleDrawerToggle: () => void;
  mobileopen: boolean;
};
const CategoryMenu = (props:propstype) => {


  const drawer = (
    <Box onClick={props.handleDrawerToggle} sx={{ textAlign: "left" }}>
      {categories.map((category: string, index: number) => (
        <Box
          key={index}
          sx={{
            alignItems: "center",
            cursor: "pointer",
            color: grey[800],
            fontWeight: 500,
            fontSize: "15px",
            padding: "15px",

            "&:hover": {
              color: purple[800],
              backgroundColor: grey[200],transform:'scale(1.05)',
            },
          }}
        >
          <NavLink
            to={`/products/${category}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText primary={category} sx={{ mr: 0.5 }} />
          </NavLink>
        </Box>
      ))}
    </Box>
  );
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        direction: "rtl",
        justifyContent: "flex-end",
        padding: "10px 25px",
        borderBottom: "1px solid #80808052",
      }}
    >
      {" "}
      {categories.map((category: string, index: number) => (
        <Box
          key={index}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            cursor: "pointer",
            color: "#000",
            fontWeight: 500,
            fontSize: "15px",
            "&:hover": { color: "#1976d2" },
          }}
        >
          <NavLink
            to={`/products/${category}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText primary={category} sx={{ mr: 0.5 }} />
          </NavLink>
        </Box>
      ))}
      <nav>
        <Drawer
  
          variant="temporary"
          open={props.mobileopen}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default CategoryMenu;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import HelpMenu from "../Helpmenu";
import CategoryMenu from "../Cateogymenu";

import { styled, alpha } from "@mui/material/styles";

import { purple} from "@mui/material/colors";
import Selectsearch from "../../Selectsearch/Selectsearch";
import { useNavigate } from "react-router-dom";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight:"0px",
  marginLeft: "0px",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginRight: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
    justifyContent: "center",
    right: "0px!important",
  left: "auto!important",

  backgroundColor: purple[300],
    
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "5px",
    fontSize: "14px",
    transition: theme.transitions.create("width"),
    width: "100% !important",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: `calc(1em + ${theme.spacing(4)})` },
  },
}));

function Header() {
  console.log("header")
  const [searchtext, setsearchtext] = React.useState<string>("");
  const [searchcat, setsearchcat] = React.useState<string>("ALL");
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = React.useState(true); // ← حالة لعرض البانر
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {

    setMobileOpen((prevState) => !prevState);


  };
  const hidediscount = () => {

    setShowBanner(false)
  };


  const handlesearch = () => {
  
    navigate(`/search?cat=${searchcat}&text=${searchtext}`)
}
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        color: "black",
      }}
    >
      <Box
        sx={{
          backgroundColor: "black",
          display: showBanner ? "flex" : "none",
        }}
      >
        <IconButton
          color="primary"
          aria-label="close banner"
          sx={{ padding: "0px", marginRight: "auto" }}
          onClick={hidediscount}
        >
          <CloseIcon style={{ color: "white", padding: "1px" }} />
        </IconButton>
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: { xs: "14px", md: "18px" },
            padding: "1px",
            flex: 1,
          }}
        >
          Up to 35% discount for a limited time
        </Typography>
      </Box>

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "6px 0px",
          maxWidth: "100% !important",
          width: "100%",
          gap: "20px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" }, marginRight: "auto" }}
        >
          <MenuIcon />
        </IconButton>
        <Box onClick={()=>navigate("/")}>
          <img src="/logo1.png" width="160px" style={{ cursor: "pointer" }} />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "0px",
            width: "100%",
          }}
        >
          <Selectsearch setsearchcat={setsearchcat}></Selectsearch>
          <Search
            sx={{
              flex: 1,
              border: "1px solid #80808052",
              width: "100%",
            }}
          >
            <SearchIconWrapper
              sx={{
                left: "10px",
                right: "auto",
                cursor: "pointer",
                pointerEvents: "all",
                zIndex: "1000",
              }}
              onClick={handlesearch}
            >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputProps={{ "aria-label": "search", dir: "ltr" }}
              placeholder="What are you looking for?"
              sx={{ width: "100%" }}
              value={searchtext}
              onChange={(e) => setsearchtext(e.target.value)}
            />
          </Search>
        </Box>
        <HelpMenu />
      </Container>

      <CategoryMenu
        handleDrawerToggle={handleDrawerToggle}
        mobileopen={mobileOpen}
      />
    </AppBar>
  );
}

export default Header;

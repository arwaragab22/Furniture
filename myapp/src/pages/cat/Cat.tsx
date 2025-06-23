import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import Catogrycard from "../../components/Catogrycard";

function Cat() {
  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Box>
          {" "}
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              backgroundColor: "#f8eaf8",
              paddingTop: "20px",
              height:"120px"
            }}
          >
            Cateogry
          </Typography>
        </Box>
        <Catogrycard />
      </Box>
    </Box>
  );
}

export default Cat;
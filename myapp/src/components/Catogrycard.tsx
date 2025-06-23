import { Box, Grid, keyframes, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import all from "../most.json";
import { useNavigate } from 'react-router-dom';
const framesanim = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;
function Catogrycard() {
const [cats,setcats]=useState(all.cat)
    const navigate = useNavigate();
    return (
    
        <Grid container spacing={2} sx={{marginTop:"-50px",marginBottom:"20px"}}>

            {
                cats?.map((ele) => {
                    return (
                        <Grid
                            onClick={() => {
navigate(`/products/${ele.cat}`);
                            }}
                        size={{ xs: 12,sm:6, md: 3 }}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "20px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={ele.img}
                          width="200px"
                          height="200px"
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                        <Stack direction={"row"} sx={{ alignItems: "center" }}>
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            {ele.cat}
                          </Typography>
                          <TrendingFlatIcon
                            sx={{
                              animation: `${framesanim} 1s infinite ease-in-out`,
                            }}
                          />
                        </Stack>
                      </Grid>
                    );
                })}
</Grid>
)
    
}

export default Catogrycard
import React from "react";
import { Tooltip, Select, MenuItem, FormControl, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

const SmallSelect = styled(InputBase)(({ theme }) => ({
    borderRadius: 8,
    position: "relative",
    fontSize: 20,
    padding: "6px 10px",
    width: 60,
    textAlign: "center",
    cursor: "pointer",
}));

export default function CountrySelector({ selectedCountry, handleCountryChange }) {
    return (
    
            <FormControl variant="standard" sx={{float:"right",backgroundColor:"white !important"}}>
                <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    input={<SmallSelect />}
                >
                    <MenuItem value="en">🇺🇸</MenuItem>
                    <MenuItem value="ar">🇪🇬</MenuItem>
                    
                </Select>
            </FormControl>

    );
}

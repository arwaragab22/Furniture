// pages/AboutUs.tsx
import { Box, Container, Typography } from "@mui/material";

export default function AboutUs() {
  return (
    <Container sx={{ py: 6, mb: 4 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        About Us
      </Typography>
      <Typography variant="body1" color="text.secondary">
        At ARWA Furnish , we specialize in crafting elegant and modern furniture
        that turns your house into a home. With years of experience and a
        passion for design, our mission is to bring comfort, functionality, and
        beauty to every space.
      </Typography>
    </Container>
  );
}

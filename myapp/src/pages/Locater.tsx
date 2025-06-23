import { Container, Typography, Box } from "@mui/material";

export default function StoreLocator() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Store Locator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Visit our showrooms and experience Arwa Furnish quality in person. Use
        our store locator to find the branch nearest to you.
      </Typography>
      <Box mt={2}>
        <Typography variant="body2" color="text.secondary">
          Cairo - Mall of Egypt, New Cairo, Downtown
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Alexandria - Smouha, Green Plaza
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mansoura - City Center Mall
        </Typography>
      </Box>
    </Container>
  );
}

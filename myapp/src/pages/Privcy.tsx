import { Box, Container, Typography } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Privacy Policy
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We value your privacy and are committed to protecting your personal
        information. Our privacy policy outlines the types of data we collect,
        how we use it, and the measures we take to ensure its security.
      </Typography>
    </Container>
  );
}

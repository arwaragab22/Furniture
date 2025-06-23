import { Box, Container, Typography } from "@mui/material";

export default function TermsConditions() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Terms & Conditions
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to Arwa Furnish. By accessing or using our website, you agree to
        be bound by these terms. All products and services are subject to
        availability. Prices, descriptions, and availability are subject to
        change without prior notice.
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Users must provide accurate and complete information during registration
        or checkout. Any misuse or fraudulent activity will result in immediate
        account termination. All content on this website is the intellectual
        property of Arwa Furnish.
      </Typography>
    </Container>
  );
}

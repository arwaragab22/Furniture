// pages/OurServices.tsx
import { Box, Container, Grid, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const services = [
  "Custom Furniture Design tailored to your space",
  "Free Interior Design Consultation with experts",
  "Fast & Secure Delivery across all regions",
  "Exceptional After-Sales Support & Warranty",
];

export default function OurServices() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Our Services
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        At Arwa Furnish, we go beyond just selling furniture — we offer a
        holistic experience from inspiration to installation. Explore our range
        of services designed to make your home furnishing journey seamless and
        enjoyable.
      </Typography>
      <Grid container spacing={2}>
        {services.map((service, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box display="flex" alignItems="center">
              <CheckCircle sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="body1" color="text.secondary">
                {service}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

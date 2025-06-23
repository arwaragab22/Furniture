import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function ContactUs() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Contact Us
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Have a question or need help with your order? Reach out to us and we’ll
        be happy to assist you.
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Send Message
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: 23450
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: arwa.ragb22@gmail.com
            </Typography>
            <Typography variant="h6" mt={4} gutterBottom>
              Business Hours
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Saturday to Thursday: 10:00 AM - 10:00 PM
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Friday: 2:00 PM - 10:00 PM
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

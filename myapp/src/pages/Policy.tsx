import { Container, Typography } from "@mui/material";

export default function ReturnPolicy() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Return Policy
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        At Arwa Furnish, your satisfaction is our priority. If you're not
        completely satisfied with your purchase, you may request a return within
        14 days of receiving your item.
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Returned items must be in their original condition and packaging.
        Customized or clearance items are non-returnable unless defective.
        Please retain your receipt or proof of purchase to process any return.
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Once we receive and inspect the item, your refund will be processed
        within 7–10 business days via your original payment method. If you need
        assistance, contact our customer support team.
      </Typography>
    </Container>
  );
}

// pages/FAQ.tsx
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "Do you offer home delivery?",
    answer: "Yes, we provide secure and timely delivery across all regions.",
  },
  {
    question: "Can I customize my furniture?",
    answer:
      "Absolutely! We offer custom furniture design to fit your style and space.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You may return products within 14 days in original condition. See Return Policy for details.",
  },
];

export default function FAQ() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" fontWeight="bold">
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

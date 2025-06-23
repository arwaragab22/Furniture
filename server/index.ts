import express from "express";
import Stripe from "stripe";
import cors from "cors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// 👇 تعديل CORS هنا
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
  })
);

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error creating payment intent" });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));

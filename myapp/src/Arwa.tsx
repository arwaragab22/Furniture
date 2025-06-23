// ✅ CheckoutForm.tsx أو أي اسم تاني عندك

import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// المفتاح العلني (public key)
const stripePromise = loadStripe(
  "pk_test_51RIS0e4ScLjKRUUk2OnJrP1pXFgaH6dpLP95KewZUJ4GRB9zSWdYbv9rTJbwK1L0UNo1OWbvocEYzHFUJIj82K0400GGnIMBS7"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ الخطوة 1: ابعتي طلب للسيرفر عشان ترجعي clientSecret
    const response = await fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 2000 }), // = 20 دولار مثلًا
    });

    const { clientSecret } = await response.json();

    // ✅ الخطوة 2: استخدمي Stripe لتأكيد الدفع
    const result = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement)!,
      },
    });

    if (result?.paymentIntent?.status === "succeeded") {
      alert("✅ Payment successful (Real)");
    } else {
      console.error(result?.error);
      alert("❌ Payment failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
  
    </form>
  );
};

export default function Arwa() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

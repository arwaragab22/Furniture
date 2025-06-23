// StripeWrapper.tsx
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./pages/Checkout";

const stripePromise = loadStripe(
  "pk_test_51RIS0e4ScLjKRUUk2OnJrP1pXFgaH6dpLP95KewZUJ4GRB9zSWdYbv9rTJbwK1L0UNo1OWbvocEYzHFUJIj82K0400GGnIMBS7"
);
const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default StripeWrapper;

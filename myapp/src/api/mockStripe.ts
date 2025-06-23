export const createPaymentIntent = async (amount: number) => {
  const res = await fetch("http://localhost:4242/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  const data = await res.json();
  return {
    clientSecret: data.clientSecret,
  };
};

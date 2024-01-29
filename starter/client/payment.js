document.addEventListener("DOMContentLoaded", async () => {
  // Fetch the publishableKey from the server
  const { publishableKey } = await fetch("/config").then((r) => r.json());
  const stripe = Stripe(publishableKey);

  // Create the payment intent on the server
  const { clientSecret } = await fetch("/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());

  // Mount our elements
  const elements = stripe.elements({ clientSecret });
  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
});

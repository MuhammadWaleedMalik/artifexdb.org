import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL; 

const stripePromise = loadStripe("pk_test_51QyXoa2cwOoBDHjfP7ww3jHcFNoqjjGMSqJuFC12ARkenMVmsXm17VYpEi3sj3hsexylHTsfsL0ThlWguTlcvCS000TmHKEIur");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements || !country) {
      setMessage("Please fill all details.");
      setLoading(false);
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { address: { country } },
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

const response = fetch(`${API_URL}/api/v1/payment/create`, {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` // Add token from localStorage
  },
  body: JSON.stringify({
    amount: 2500, // Amount in cents ($25)
    paymentMethodId: paymentMethod.id,
    country,
  }),
});

      const result = await response.json();
      if (result.success) {
        setMessage("Payment successful! 🎉");
      } else {
        setMessage(`Payment failed: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <CardElement className="p-3 border rounded-md bg-white text-black" />
      
      {/* Country Input */}
      <input
        type="text"
        placeholder="Country (e.g., US, IN)"
        value={country}
        onChange={(e) => setCountry(e.target.value.toUpperCase())}
        required
        className="w-full p-3 border rounded-md bg-white text-black"
      />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-800 transition"
      >
        {loading ? "Processing..." : "Pay $50"}
      </button>
      
      {message && <p className="mt-3 text-lg font-semibold text-center">{message}</p>}
    </form>
  );
}

export default function EnterCheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-blue-400 text-center">Checkout</h2>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
}

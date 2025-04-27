// PaymentModal.jsx
import { useState } from "react";
import { FaPaypal, FaStripe } from "react-icons/fa";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51R86Nh06zyZp2TkrngAmWLN92kOWKyWWLUO97ETLB3XjAkvxce7rmlrfLqPGwcR2bPtkR7XJmhF23BTXL6HpgXHB00POuEVLLX");

const PaymentModal = ({ booking, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [paypalPassword, setPaypalPassword] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleStripePayment = async () => {
    if (!stripe || !elements) return;

    try {
      const cardElement = elements.getElement(CardElement);

      // For simplicity, we're simulating PaymentIntent here
      const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error(error);
        alert("Payment failed");
        return;
      }

      // Simulate payment success (You would normally confirm PaymentIntent here)
      await handlePayment(); // Call your update booking function
    } catch (err) {
      console.error(err);
      alert("Stripe Payment failed");
    }
  };

  const handlePaypalPayment = async () => {
    if (!paypalEmail || !paypalPassword) {
      alert("Please enter PayPal email and password");
      return;
    }

    try {
      // Simulate payment success (no real PayPal SDK used here)
      await handlePayment();
    } catch (err) {
      console.error(err);
      alert("PayPal Payment failed");
    }
  };

  const handlePayment = async () => {
    try {
      const fakeTransactionId = "txn_" + Date.now();

      const res = await axios.post(
        `http://localhost:5000/api/bookings/pay/${booking._id}`,
        {
          method: paymentMethod,
          transactionId: fakeTransactionId,
        }
      );

      alert("Payment successful!");
      onPaymentSuccess(); // Refresh or close modal
      onClose();
    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      alert("Payment failed");
    }
  };

  const handleSubmit = async () => {
    if (paymentMethod === "stripe") {
      await handleStripePayment();
    } else {
      await handlePaypalPayment();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Complete Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">X</button>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 mb-1 font-semibold">Booking:</p>
          <p>{booking?.proName} - {booking?.quotePrice}$</p>
        </div>

        {/* Payment method selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border transition ${
                paymentMethod === "paypal" ? "bg-blue-100 border-blue-400" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <FaPaypal className="text-2xl text-blue-600" /> PayPal
            </button>
            <button
              onClick={() => setPaymentMethod("stripe")}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border transition ${
                paymentMethod === "stripe" ? "bg-purple-100 border-purple-400" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <FaStripe className="text-2xl text-purple-600" /> Stripe
            </button>
          </div>
        </div>


        {/* Payment form */}
        {paymentMethod === "stripe" ? (
          <div className="mb-6">
            <CardElement className="p-4 border rounded-lg" />
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="PayPal Email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              placeholder="PayPal Password"
              value={paypalPassword}
              onChange={(e) => setPaypalPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Pay {booking?.quotePrice}$
        </button>
      </div>
    </div>
  );
};

const PaymentModalWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentModal {...props} />
  </Elements>
);

export default PaymentModalWrapper;

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import {  useSelector } from 'react-redux';

const stripePromise = loadStripe('pk_test_51R86Nh06zyZp2TkrngAmWLN92kOWKyWWLUO97ETLB3XjAkvxce7rmlrfLqPGwcR2bPtkR7XJmhF23BTXL6HpgXHB00POuEVLLX');


//🟥 payment form send data to model server
const PaymentForm = ({ plan, billingCycle, onSuccess, onCancel, planDetails, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const user = useSelector((state) => state.auth.user); // Get current user from Redux
  const loggedInUserId=user._id;


    console.log("Sending payment data:", {
        userId: loggedInUserId,
        planType: plan,
        amount: price,
      });
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
          setError("Stripe not initialized");
          return;
        }
      
        setProcessing(true);
        setError(null);
      
        try {
          // 1. Create Payment Intent
          const { data } = await axios.post("http://localhost:5000/api/payments/charge", {
            userId: loggedInUserId,
            planType: plan,
            amount: price*100
          });
      
          // 2. Confirm Card Payment
          const { error, paymentIntent } = await stripe.confirmCardPayment(
            data.clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                  name: user?.firstname || "Test User",
                  email: user?.email || "test@example.com",
                  address: {
                    line1: "123 Main St",
                    city: "New York",
                    state: "NY",
                    postal_code: "10001",
                    country: "US",
                  },
                },
              },
            }
          );
      
          if (error) throw error;
      
        //   // 3. Confirm Payment with Backend
        //   await axios.post("http://localhost:5000/api/subscriptions/", {
        //     paymentId: data.paymentId
        //   });
      
          // 4. Create Subscription
          await axios.post("http://localhost:5000/api/subscriptions", {
            userId: loggedInUserId,
            plan,
            billingCycle,
            amountPaid: paymentIntent.amount / 100,
            paymentId: data.paymentId, // ✅ Include paymentId
          });
      
          setSuccess(true);
          setTimeout(() => onSuccess(), 2000);
        } catch (err) {
          setError(err.response?.data?.error || err.message || "Payment failed");
          console.error("Payment error:", err);
        } finally {
          setProcessing(false);
        }
      };
      

    if (success) {
    return (
        <div className="text-center py-8">
        <div className="mb-4 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">Thank you for subscribing to our {plan} plan.</p>
        <p className="text-gray-500">Redirecting to registration form...</p>
        </div>
    );
    }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border rounded-md p-4">
      <CardElement 
  options={{
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
    hidePostalCode: true, // Ensure postal code is required
  }}
/>
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          disabled={processing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="px-6 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-800 disabled:opacity-50"
        >
          {processing ? 'Processing...' : `Pay ${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}`}
        </button>
      </div>
    </form>
  );
};

//🟥 Subscription Modal
const SubscriptionModal = ({ isOpen, onClose, plan, billingCycle, plans }) => {
  const [isPaymentStep, setIsPaymentStep] = useState(false);
  
  if (!isOpen) return null;

  const planDetails = plans[plan] || {
    name: 'Unknown Plan',
    monthlyPrice: 0,
    yearlyPrice: 0
  };

  const price = billingCycle === 'monthly' ? planDetails.monthlyPrice : planDetails.yearlyPrice;
  
  const handleContinue = () => {
    setIsPaymentStep(true);
  };

  const handlePaymentSuccess = () => {
    // Redirect to the join form
    window.location.href = '/joinform';
  };

  const handleCancel = () => {
    setIsPaymentStep(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center " style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 py-4 bg-yellow-700 text-white">
          <h3 className="text-xl font-bold">{isPaymentStep ? 'Complete Payment' : planDetails.name + ' Plan Details'}</h3>
        </div>
        
        <div className="p-6">
          {!isPaymentStep ? (
            <>
              <div className="mb-6">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                
                <div className="border-t border-b py-4 mb-4">
                  <h4 className="font-semibold mb-2">Plan Features:</h4>
                  <ul className="space-y-2">
                    {planDetails.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="text-green-500 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-gray-500 text-sm mb-6">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
                
                <div className="flex justify-between">
                  <button 
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleContinue}
                    className="px-6 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-800"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm 
                plan={planDetails.name} 
                billingCycle={billingCycle} 
                onSuccess={handlePaymentSuccess}
                onCancel={handleCancel}
                planDetails={planDetails} 
                price= {price}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
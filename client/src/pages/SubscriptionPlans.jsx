import React, { useState } from 'react';
import SubscriptionModal from "./SubscriptionModal";
import {  useSelector } from 'react-redux';

const SubscriptionPlans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleBillingCycleChange = (cycle) => setBillingCycle(cycle);
  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const plans = {
    free: {
      name: "Basic",
      tagline: "Basic Listing",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "Basic profile listing",
        "Limited number of projects (3 projects)",
        "No featured placement",
        "No priority in search results",
      ],
      cta: "Get Started"
    },
    standard: {
      name: "Standard",
      tagline: "Recommended",
      monthlyPrice: 10,
      yearlyPrice: 100,
      features: [
        "Everything in Free Plan +",
        "Can add up to 10 projects",
        "Priority placement in search results",
        "\"Verified Pro\" badge on profile",
        "More visibility in the \"Find Pro\" section",
      ],
      cta: "Get Started",
      popular: true
    },
    premium: {
      name: "Premium",
      tagline: "Best for Serious Pros",
      monthlyPrice: 25,
      yearlyPrice: 250,
      features: [
        "Everything in Standard Plan +",
        "Unlimited projects",
        "Featured in homepage recommendations",
        "Higher ranking in search results",
        "Priority support",
        "Access to client insights (who viewed your profile, engagement data)"
      ],
      cta: "Get Started"
    }
  };

  const renderPrice = (plan) => {
    if (typeof plan.monthlyPrice === 'string') {
      return plan.monthlyPrice;
    }
    
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return (
      <>
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-900 text-sm ml-1">/{billingCycle === 'monthly' ? 'Month' : 'Year'}</span>
      </>
    );
  };

  return (
    <div className="max-w-full mx-auto px-4 py-12" style={{
        background: "linear-gradient(to bottom, black 0%, black 50%, white 50%, white 100%)"
      }}>
      <div className='max-w-6xl mx-auto px-4 py-12'>
        <div className="text-center mb-12">
          <h5 className="text-yellow-600 bg-yellow-100 inline-block px-4 py-1 rounded-full mb-4">Our Pricing</h5>
          <h2 className="text-4xl font-bold mb-8 text-white">A Plan for Everyone</h2>
          
          {/* Billing toggle */}
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <button
              className={`px-6 py-2 rounded-md cursor-pointer ${billingCycle === 'monthly' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => handleBillingCycleChange('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-md cursor-pointer ${billingCycle === 'yearly' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => handleBillingCycleChange('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-center text-yellow-700 mb-2">{plans.free.name}</h3>
            <p className="text-gray-500 text-center mb-4">{plans.free.tagline}</p>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold">${plans.free.monthlyPrice}</span>
              <span className="text-gray-900 text-sm ml-1">/Month</span>
            </div>
            <ul className="mb-8 flex-grow">
              {plans.free.features.map((feature, index) => (
                <li key={index} className="mb-3 flex items-start">
                  <div className="text-gray-400 rounded-full border border-yellow-700 p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handlePlanSelection('free')}
              className="w-full py-3 rounded-lg bg-black text-white hover:text-yellow-700 cursor-pointer border border-yellow-700 font-medium hover:bg-yellow-50 transition-colors"
            >
              {plans.free.cta}
            </button>
          </div>
          
          {/* Standard Plan */}
          <div className="bg-[#A9976F] rounded-2xl shadow-lg p-8 flex flex-col h-full relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">
              {plans.standard.tagline}
            </div>
            <h3 className="text-2xl font-bold text-center text-white mb-2">{plans.standard.name}</h3>
            <p className="text-yellow-100 text-center mb-4">Perfect for growing professionals</p>
            <div className="text-center mb-6">
              {renderPrice(plans.standard)}
            </div>
            <ul className="mb-8 flex-grow">
              {plans.standard.features.map((feature, index) => (
                <li key={index} className="mb-3 flex items-start">
                  <div className="text-white rounded-full border border-white p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handlePlanSelection('standard')}
              className="w-full py-3 bg-black text-white hover:text-yellow-700 cursor-pointer rounded-lg font-medium hover:bg-yellow-50 transition-colors"
            >
              {plans.standard.cta}
            </button>
          </div>
          
          {/* Premium Plan */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-center text-yellow-700 mb-2">{plans.premium.name}</h3>
            <p className="text-gray-500 text-center mb-4">{plans.premium.tagline}</p>
            <div className="text-center mb-6">
              {renderPrice(plans.premium)}
            </div>
            <ul className="mb-8 flex-grow">
              {plans.premium.features.map((feature, index) => (
                <li key={index} className="mb-3 flex items-start">
                  <div className="text-gray-400 rounded-full border border-yellow-700 p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handlePlanSelection('premium')}
              className="w-full py-3 rounded-lg bg-black text-white hover:text-yellow-700 cursor-pointer border border-yellow-700 font-medium hover:bg-yellow-50 transition-colors"
            >
              {plans.premium.cta}
            </button>
          </div>
        </div>
      </div>
      
      <SubscriptionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
        billingCycle={billingCycle}
        plans={plans}
      />
    </div>
  );
};

export default SubscriptionPlans;
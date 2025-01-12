"use client";
import React, { useState } from 'react';
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Style from './subscription.module.css';

const Subscription = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [activeFaq, setActiveFaq] = useState(null);

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: [
        'Create up to 10 NFTs',
        'Basic analytics',
        'Community support',
        'Standard marketplace fees',
        'Basic profile customization',
      ],
      recommended: false,
    },
    {
      name: 'Pro',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        'Create unlimited NFTs',
        'Advanced analytics',
        'Priority support',
        'Reduced marketplace fees',
        'Advanced profile customization',
        'Custom collection page',
        'Early access to features',
      ],
      recommended: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      features: [
        'All Pro features',
        'Custom smart contracts',
        'Dedicated support',
        'Lowest marketplace fees',
        'White-label solution',
        'API access',
        'Custom development',
        'Premium verification',
      ],
      recommended: false,
    },
  ];

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, cryptocurrency payments (ETH, BTC), and PayPal.',
    },
    {
      question: 'Can I switch plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. The price difference will be prorated.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required.',
    },
    {
      question: 'What happens when I upgrade or downgrade?',
      answer: 'When you upgrade, you\'ll immediately get access to new features. When you downgrade, you\'ll keep premium features until your current billing period ends.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all subscription plans.',
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className={Style.subscription}>
      <div className={Style.subscription_box}>
        <h1>Choose Your Plan</h1>
        <p className={Style.subscription_desc}>
          Select the perfect plan for your NFT creation and trading needs
        </p>

        <div className={Style.billing_toggle}>
          <span className={billingPeriod === 'monthly' ? Style.active : ''}>Monthly</span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className={Style.toggle_button}
          >
            <span className={Style.toggle_slider} data-period={billingPeriod} />
          </button>
          <span className={billingPeriod === 'yearly' ? Style.active : ''}>
            Yearly <span className={Style.save_badge}>Save 20%</span>
          </span>
        </div>

        <div className={Style.plans_container}>
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`${Style.plan_card} ${plan.recommended ? Style.recommended : ''}`}
            >
              {plan.recommended && (
                <span className={Style.recommended_badge}>Recommended</span>
              )}
              <h3>{plan.name}</h3>
              <div className={Style.price}>
                <span className={Style.currency}>$</span>
                <span className={Style.amount}>
                  {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className={Style.period}>/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <ul className={Style.features_list}>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <FaCheck className={Style.check_icon} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={Style.subscribe_btn}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className={Style.faq_section}>
          <h2>Frequently Asked Questions</h2>
          <div className={Style.faq_container}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`${Style.faq_item} ${activeFaq === index ? Style.active : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className={Style.faq_question}>
                  <h3>{faq.question}</h3>
                  {activeFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <div className={Style.faq_answer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription; 
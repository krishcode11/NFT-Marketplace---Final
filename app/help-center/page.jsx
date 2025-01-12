"use client";
import { useState } from "react";
import Style from "./HelpCenter.module.css";
import { FaEthereum, FaWallet, FaQuestionCircle } from "react-icons/fa";
import { MdSecurity, MdContactSupport } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { RiNftFill } from "react-icons/ri";

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("getting-started");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <FaQuestionCircle />,
      questions: [
        {
          q: "What is an NFT?",
          a: "NFT stands for Non-Fungible Token. It's a unique digital asset that represents ownership of a specific item or piece of content on the blockchain."
        },
        {
          q: "How do I connect my wallet?",
          a: "Click the 'Connect Wallet' button in the navigation bar and select your preferred wallet (MetaMask, etc.). Follow the wallet's prompts to complete the connection."
        },
        {
          q: "What cryptocurrencies can I use?",
          a: "Currently, our marketplace uses ETH (Ethereum) for all transactions. Make sure you have enough ETH in your wallet for purchases and gas fees."
        }
      ]
    },
    {
      id: "buying",
      title: "Buying NFTs",
      icon: <BiPurchaseTag />,
      questions: [
        {
          q: "How do I buy an NFT?",
          a: "Browse the marketplace, click on an NFT you like, and click the 'Buy Now' button. Confirm the transaction in your wallet and pay the listed price plus gas fees."
        },
        {
          q: "What are gas fees?",
          a: "Gas fees are transaction costs on the Ethereum network. They vary based on network congestion and are paid to process your transaction."
        },
        {
          q: "Can I negotiate the price?",
          a: "Currently, NFTs are sold at fixed prices. The price is set by the seller when listing the NFT."
        }
      ]
    },
    {
      id: "selling",
      title: "Selling NFTs",
      icon: <RiNftFill />,
      questions: [
        {
          q: "How do I list my NFT for sale?",
          a: "Go to your dashboard, select the NFT you want to sell, click 'List for Sale', set your price, and confirm the transaction."
        },
        {
          q: "What are royalties?",
          a: "Royalties are fees paid to the original creator every time their NFT is resold. Our smart contract ensures creators receive their royalties automatically."
        },
        {
          q: "Can I cancel my listing?",
          a: "Yes, you can cancel your listing at any time from your dashboard. You'll need to pay gas fees for the cancellation transaction."
        }
      ]
    },
    {
      id: "security",
      title: "Security",
      icon: <MdSecurity />,
      questions: [
        {
          q: "Is my NFT secure?",
          a: "Yes, your NFTs are secured by the Ethereum blockchain. Our smart contract has been audited and follows industry best practices."
        },
        {
          q: "What happens if I lose my wallet access?",
          a: "Your NFTs are tied to your wallet address. Always keep your seed phrase safe, as it's the only way to recover wallet access."
        },
        {
          q: "How do I report suspicious activity?",
          a: "Contact our support team immediately if you notice any suspicious activity. We take security very seriously."
        }
      ]
    },
    {
      id: "support",
      title: "Support",
      icon: <MdContactSupport />,
      questions: [
        {
          q: "How can I contact support?",
          a: "You can reach our support team through email at support@nftmarketplace.com or join our Discord community for real-time assistance."
        },
        {
          q: "What if a transaction fails?",
          a: "If a transaction fails, the gas fee might still be charged. Check your wallet's transaction history and our FAQ for common solutions."
        },
        {
          q: "Are there platform fees?",
          a: "Yes, we charge a small platform fee on each transaction to maintain and improve the marketplace. The fee is clearly shown before each purchase."
        }
      ]
    }
  ];

  return (
    <div className={Style.help_center}>
      <div className={Style.help_container}>
        <div className={Style.help_header}>
          <h1>Help Center</h1>
          <p>Find answers to your questions about our NFT marketplace</p>
        </div>

        <div className={Style.category_grid}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${Style.category_card} ${
                activeCategory === category.id ? Style.active : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className={Style.category_icon}>{category.icon}</div>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        <div className={Style.faq_section}>
          {categories
            .find((cat) => cat.id === activeCategory)
            ?.questions.map((item, index) => (
              <div key={index} className={Style.faq_item}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
        </div>

        <div className={Style.contact_support}>
          <div className={Style.support_content}>
            <MdContactSupport className={Style.support_icon} />
            <h2>Still need help?</h2>
            <p>Our support team is here to assist you</p>
            <button className={Style.support_button}>Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter; 
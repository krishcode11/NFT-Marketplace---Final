"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEthereum, 
  FaHeart,
  FaShareAlt,
  FaRegClock,
  FaHistory
} from "react-icons/fa";

import Style from "../../styles/nftDetails.module.css";
import { NFTDescription, NFTDetailsImg, NFTTabs } from "../../NFTDetailsPage/NFTDetailsIndex";
import { Category, Brand } from "../../components/componentsindex";

const NFTDetailsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Mock NFT data
  const nftData = {
    id: 1,
    name: "Abstract Digital Art #123",
    creator: "Artist One",
    owner: "Collector X",
    price: 2.5,
    likes: 1234,
    description: "A unique piece of digital art that combines abstract elements with modern design principles. This NFT represents the convergence of traditional artistic expression and blockchain technology.",
    image: "/nft1.jpg",
    verified: true,
    history: [
      { event: "Listed", price: 2.5, date: "2024-01-15" },
      { event: "Transfer", from: "PrevOwner", to: "Collector X", date: "2024-01-10" },
      { event: "Minted", by: "Artist One", date: "2024-01-01" }
    ]
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={Style.container}>
            <div className={Style.nftContent}>
              {/* Left Section - NFT Image */}
              <div className={Style.imageSection}>
                <NFTDetailsImg 
                  nft={nftData}
                  isLiked={isLiked}
                  setIsLiked={setIsLiked}
                />
              </div>

              {/* Right Section - Details */}
              <div className={Style.detailsSection}>
                <NFTDescription 
                  nft={nftData}
                />

                <div className={Style.priceSection}>
                  <div className={Style.currentPrice}>
                    <span>Current Price</span>
                    <div className={Style.priceValue}>
                      <FaEthereum />
                      <span>{nftData.price} ETH</span>
                    </div>
                  </div>
                  <button className={Style.buyButton}>
                    Buy Now
                  </button>
                  <button className={Style.makeOfferButton}>
                    Make Offer
                  </button>
                </div>

                {/* NFT Tabs */}
                <NFTTabs 
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  nft={nftData}
                />
              </div>
            </div>
          </div>
          <Category />
          <Brand />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NFTDetailsPage;
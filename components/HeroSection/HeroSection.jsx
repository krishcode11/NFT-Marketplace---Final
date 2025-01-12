"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";

import { useNFTMarketplace } from "../../Context/NFTMarketplaceContext";
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';

const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.2
      }
    },
  };

  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <motion.div 
          className={Style.heroSection_box_left}
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className={Style.gradientText}
          >
            Discover, collect, and sell
            <br />
            <span className={Style.highlight}>Extraordinary</span> NFTs
          </motion.h1>
          
          <motion.p variants={fadeInUp}>
            Explore the world's leading NFT marketplace with the most
            extraordinary digital art and collectibles. Join our community
            and start your NFT journey today!
          </motion.p>

          <motion.div
            className={Style.heroSection_box_left_btn}
            variants={fadeInUp}
          >
            <Button 
              btnText="Explore Collection" 
              classStyle={Style.primaryBtn}
            />
            <Button 
              btnText="Create NFT" 
              classStyle={Style.secondaryBtn}
            />
          </motion.div>

          <motion.div 
            className={Style.statsContainer}
            variants={fadeInUp}
          >
            <div className={Style.statItem}>
              <span className={Style.statValue}>200K+</span>
              <span className={Style.statLabel}>Collections</span>
            </div>
            <div className={Style.statItem}>
              <span className={Style.statValue}>10K+</span>
              <span className={Style.statLabel}>Artists</span>
            </div>
            <div className={Style.statItem}>
              <span className={Style.statValue}>423K+</span>
              <span className={Style.statLabel}>Community</span>
            </div>
          </motion.div>
        </motion.div>

        <div className={Style.heroSection_box_right}>
          <motion.div
            className={Style.imageWrapper}
            initial="initial"
            animate="animate"
            variants={imageAnimation}
          >
            <div className={Style.glowEffect}></div>
            <Image
              src={images.hero}
              alt="Hero section"
              width={600}
              height={600}
              className={Style.heroImage}
            />
            <div className={Style.floatingCard}>
              <div className={Style.cardContent}>
                <h4>Trending NFT</h4>
                <p>Current Bid: 2.5 ETH</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

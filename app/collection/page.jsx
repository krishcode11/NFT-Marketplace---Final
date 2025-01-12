"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Style from "../collection/collection.module.css"; // Ensure this path is correct
import Banner from "../../collectionPage/Banner/Banner";
import CollectionProfile from "../../collectionPage/collectionProfile/collectionProfile";
import NFTCardTwo from "../../collectionPage/NFTCardTwo/NFTCardTwo";
import { Slider, Brand } from "../../components/componentsindex";
import images from "../../img";
import { FaFilter } from "react-icons/fa";

export default function Collection() {
  const [isVisible, setIsVisible] = useState(false);
  const NFTData = [images.nft_image_1, images.nft_image_2, images.nft_image_3, images.nft_image_1];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className={Style.collection}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div variants={childVariants}>
        <Banner />
      </motion.div>

      <motion.div variants={childVariants}>
        <CollectionProfile />
      </motion.div>

      <motion.div 
        className={Style.collection_filter}
        variants={childVariants}
      >
        <div className={Style.collection_filter_box}>
          <FaFilter className={Style.collection_filter_box_icon} />
          <select>
            <option>Recently Added</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>
      </motion.div>

      <motion.div 
        className={Style.collection_nfts}
        variants={childVariants}
      >
        <NFTCardTwo NFTData={NFTData} />
      </motion.div>

      <motion.div variants={childVariants}>
        <Slider />
      </motion.div>

      <motion.div variants={childVariants}>
        <Brand />
      </motion.div>
    </motion.div>
  );
}

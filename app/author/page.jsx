"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  FaEthereum, 
  FaUserFriends, 
  FaHeart,
  FaRegClock
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

import Style from "../../styles/author.module.css";
import Banner from "../../collectionPage/Banner/Banner";
import { 
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox 
} from "../../authorPage/authorIndex";
import { Brand, Title } from "../../components/componentsindex";
import images from "../../img";

const statsData = [
  { icon: <FaEthereum />, label: "Total Volume", value: "47.8 ETH" },
  { icon: <FaUserFriends />, label: "Followers", value: "8.5K" },
  { icon: <FaHeart />, label: "Total Likes", value: "37.2K" },
  { icon: <FaRegClock />, label: "Joined", value: "2 years ago" }
];

export default function Author() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("collectibles");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={Style.authorContainer}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.div 
        className={Style.heroSection}
        variants={itemVariants}
      >
        <div className={Style.heroBackground}>
          <Image
            src={images.creatorbackground1}
            alt="Author Background"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className={Style.heroOverlay} />
        </div>
        
        <div className={Style.heroContent}>
          <motion.div 
            className={Style.authorAvatar}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={images.user1}
              alt="Author"
              width={150}
              height={150}
              className={Style.avatarImage}
            />
            <span className={Style.verifiedBadge}>
              <MdVerified />
            </span>
          </motion.div>
          
          <motion.div className={Style.authorInfo}>
            <h1>Cyber Artist <span className={Style.verifiedText}>Verified</span></h1>
            <p className={Style.authorBio}>
              Digital art creator and NFT enthusiast. Specializing in cyberpunk and futuristic designs.
            </p>
          </motion.div>
        </div>

        <div className={Style.statsGrid}>
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              className={Style.statCard}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <span className={Style.statIcon}>{stat.icon}</span>
              <div className={Style.statInfo}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Author Profile Section */}
      <motion.div 
        variants={itemVariants}
        className={Style.profileSection}
      >
        <AuthorProfileCard />
      </motion.div>

      {/* Tabs Section */}
      <motion.div 
        variants={itemVariants}
        className={Style.tabsSection}
      >
        <AuthorTaps onTabChange={setActiveTab} activeTab={activeTab} />
      </motion.div>

      {/* NFT Grid Section */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={Style.nftGridSection}
        >
          <AuthorNFTCardBox />
        </motion.div>
      </AnimatePresence>

      {/* Popular Creators Section */}
      <motion.div 
        variants={itemVariants}
        className={Style.popularCreatorsSection}
      >
        <Title
          heading="More Like This"
          paragraph="Discover similar creators and their unique collections"
        />
        <Brand />
      </motion.div>
    </motion.div>
  );
}

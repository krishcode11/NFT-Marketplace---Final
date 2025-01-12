"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Style from './Banner.module.css';

const Banner = () => {
  const bannerItems = [
    { icon: "✨", text: "Featured Collection" },
    { icon: "🎯", text: "Trending Now" },
    { icon: "🎨", text: "Exclusive Drops" },
    { icon: "💎", text: "Rare Items" },
    { icon: "🚀", text: "Limited Edition" },
    { icon: "🌟", text: "Top Rated" },
    { icon: "✨", text: "Featured Collection" },
    { icon: "🎯", text: "Trending Now" }
  ];

  const bannerVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className={Style.banner}>
      <motion.div 
        className={Style.banner_content}
        variants={bannerVariants}
        animate="animate"
      >
        {bannerItems.map((item, index) => (
          <motion.div
            key={index}
            className={Style.banner_item}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <span className={Style.banner_icon}>{item.icon}</span>
            <span className={Style.banner_text}>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Banner; 
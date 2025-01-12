"use client";
import React from "react";
import { motion } from "framer-motion";

//INTERNAL IMPORT
import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import images from "../../img";

const Slider = () => {
  const sliderArray = [
    {
      background: images.creatorbackground1,
      name: "Distant Galaxy",
      price: "1.5 ETH",
      time: "2h : 30m : 20s",
      alt: "A mesmerizing digital artwork of a distant galaxy with vibrant cosmic colors"
    },
    {
      background: images.creatorbackground2,
      name: "Life On Edena",
      price: "2.5 ETH",
      time: "3h : 15m : 20s",
      alt: "Digital illustration depicting the fantastical life forms on planet Edena"
    },
    {
      background: images.creatorbackground3,
      name: "AstroFiction",
      price: "3.8 ETH",
      time: "4h : 10m : 20s",
      alt: "Futuristic astronaut-themed digital artwork in a sci-fi setting"
    },
    {
      background: images.creatorbackground4,
      name: "CyberPunk City",
      price: "4.5 ETH",
      time: "2h : 15m : 20s",
      alt: "Neon-lit cyberpunk cityscape with futuristic architecture and atmosphere"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={Style.slider}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className={Style.slider_box}>
        <motion.h2 variants={headerVariants}>
          Explore NFTs
        </motion.h2>
        <motion.div 
          className={Style.slider_box_cards}
          variants={containerVariants}
        >
          {sliderArray.map((el, i) => (
            <SliderCard key={i + 1} el={el} i={i} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slider;
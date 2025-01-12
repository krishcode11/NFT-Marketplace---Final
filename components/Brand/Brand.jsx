"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

//INTERNAL IMPORT
import Style from "./Brand.module.css";
import images from "../../img";

const Brand = () => {
  const brands = [
    { image: images.brand1, alt: "Dropbox brand logo", delay: 0.1 },
    { image: images.brand2, alt: "Ethereum brand logo", delay: 0.2 },
    { image: images.brand3, alt: "Intercom brand logo", delay: 0.3 },
    { image: images.brand4, alt: "Coinbase brand logo", delay: 0.4 },
    { image: images.brand5, alt: "Netflix brand logo", delay: 0.5 }
  ];

  return (
    <div className={Style.brand}>
      <div className={Style.brand_box}>
        <div className={Style.brand_box_left}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🎯 Featured Brands
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We've partnered with leading brands to bring you exclusive NFT collections
          </motion.p>
        </div>

        <div className={Style.brand_box_right}>
          {brands.map((brand, i) => (
            <motion.div 
              className={Style.brand_box_right_box}
              key={i + 1}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: brand.delay }}
              whileHover={{ 
                scale: 1.1,
                filter: "brightness(1.2)",
                transition: { duration: 0.2 }
              }}
            >
              <Image
                src={images.logo}
                alt="brand logo"
                width={150}
                height={150}
                className={Style.brand_box_right_box_img}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;

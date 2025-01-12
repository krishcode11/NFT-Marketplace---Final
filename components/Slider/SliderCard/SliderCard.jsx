"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

//INTERNAL IMPORT
import Style from "./SliderCard.module.css";
import images from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile";

const SliderCard = ({ el, i }) => {
  return (
    <motion.div className={Style.sliderCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      <div className={Style.sliderCard_box}>
        <div className={Style.sliderCard_box_img}>
          <Image
            src={el.background}
            className={Style.sliderCard_box_img_img}
            alt={el.alt}
            width={500}
            height={300}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={Style.sliderCard_box_title}>
          <p>{el.name}</p>
          <div className={Style.sliderCard_box_title_like}>
            <LikeProfile />
            <small>{el.price || "1.5 ETH"}</small>
          </div>
        </div>

        <div className={Style.sliderCard_box_price}>
          <div className={Style.sliderCard_box_price_box}>
            <small>Current Bid</small>
            <p>{el.price || "1.5 ETH"}</p>
          </div>

          <div className={Style.sliderCard_box_price_time}>
            <small>Remaining time</small>
            <p>{el.time || "3h : 15m : 20s"}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SliderCard; 
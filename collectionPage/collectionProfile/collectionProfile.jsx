"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

//INTERNAL IMPORT
import Style from "./collectionProfile.module.css";
import images from "../../img";
import { Banner } from "../../components/componentsindex";

const CollectionProfile = () => {
  const cardArray = [
    {
      title: "Total NFTs",
      value: "2,568",
      prefix: "",
      suffix: ""
    },
    {
      title: "Total Volume",
      value: "13.2",
      prefix: "",
      suffix: "K"
    },
    {
      title: "Total Sales",
      value: "1,234",
      prefix: "",
      suffix: ""
    },
    {
      title: "Unique Holders",
      value: "3.2",
      prefix: "",
      suffix: "K"
    },
  ];

  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <div className={Style.collectionProfile_box_left_img_container}>
            <Image
              src={images.nft_image_1}
              alt="NFT Collection Cover"
              width={800}
              height={800}
              className={Style.collectionProfile_box_left_img}
              priority
            />
            <div className={Style.image_overlay} />
          </div>

          <div className={Style.collectionProfile_box_left_social}>
            <a href="#" className={Style.social_icon}>
              <FaFacebook />
            </a>
            <a href="#" className={Style.social_icon}>
              <FaTwitter />
            </a>
            <a href="#" className={Style.social_icon}>
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <div className={Style.title_section}>
            <h1>Awesome NFT Collection</h1>
            <div className={Style.verified_badge}>
              <span>✓</span> Verified
            </div>
          </div>

          <p className={Style.description}>
            Discover our unique collection of digital art and collectibles. Each piece is carefully curated and represents the future of digital ownership.
          </p>

          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el, i) => (
              <div
                key={i + 1}
                className={Style.collectionProfile_box_middle_box_item}
              >
                <small>{el.title}</small>
                <p>
                  {el.prefix}{el.value}{el.suffix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionProfile;
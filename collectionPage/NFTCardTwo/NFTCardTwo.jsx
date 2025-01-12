"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdTimer } from "react-icons/md";
import { motion } from "framer-motion";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "../../components/componentsindex";
import images from "../../img";

const NFTCardTwo = ({ NFTData = [] }) => {
  const [likedNFTs, setLikedNFTs] = useState({});
  const [likeCounts, setLikeCounts] = useState({});

  // Fallback image in case NFT image is not available
  const fallbackImage = images.nft_image_1;

  const handleLikeNFT = useCallback((id) => {
    setLikedNFTs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    setLikeCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 21) + (!likedNFTs[id] ? 1 : -1)
    }));
  }, [likedNFTs]);

  const handleImageError = (e) => {
    if (e.target) {
      e.target.src = fallbackImage;
    }
  };

  if (!Array.isArray(NFTData) || NFTData.length === 0) {
    return (
      <div className={Style.noNFTs}>
        <BsImage className={Style.noNFTs_icon} />
        <p>No NFTs available</p>
      </div>
    );
  }

  return (
    <div className={Style.NFTCardTwo}>
      {NFTData.map((el, i) => (
        <motion.div 
          className={Style.NFTCardTwo_box} 
          key={`nft-card-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -10 }}
        >
          <div className={Style.NFTCardTwo_box_like}>
            <div className={Style.NFTCardTwo_box_like_box}>
              <div 
                className={Style.NFTCardTwo_box_like_box_box}
                onClick={() => handleLikeNFT(i)}
              >
                <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                <div className={Style.like_content}>
                  {likedNFTs[i] ? (
                    <AiFillHeart className={Style.liked} />
                  ) : (
                    <AiOutlineHeart />
                  )}
                  <span>{likeCounts[i] || 21}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={Style.NFTCardTwo_box_img}>
            {el && el !== "" ? (
              <Image
                src={el}
                alt={`NFT artwork ${i + 1}`}
                width={500}
                height={500}
                className={Style.NFTCardTwo_box_img_img}
                priority={i < 2}
                onError={handleImageError}
                quality={90}
              />
            ) : (
              <Image
                src={fallbackImage}
                alt={`NFT artwork ${i + 1}`}
                width={500}
                height={500}
                className={Style.NFTCardTwo_box_img_img}
                priority={i < 2}
                quality={90}
              />
            )}
            <div className={Style.NFTCardTwo_box_img_overlay}>
              <motion.button 
                className={Style.view_button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </div>
          </div>

          <div className={Style.NFTCardTwo_box_info}>
            <div className={Style.NFTCardTwo_box_info_left}>
              <LikeProfile />
              <div className={Style.title_container}>
                <h3>Clone #{i + 1}</h3>
                <p className={Style.creator}>by CryptoArtist</p>
              </div>
            </div>
            <div className={Style.NFTCardTwo_box_info_right}>
              <div className={Style.price_tag}>4.{i + 2} ETH</div>
            </div>
          </div>

          <div className={Style.NFTCardTwo_box_price}>
            <div className={Style.NFTCardTwo_box_price_box}>
              <div className={Style.price_info}>
                <small>Current Bid</small>
                <p className={Style.price_value}>1{i + 5}.000 ETH</p>
              </div>
            </div>
            <div className={Style.NFTCardTwo_box_price_time}>
              <MdTimer className={Style.timer_icon} />
              <span>{i + 1}h left</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NFTCardTwo;
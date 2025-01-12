import React from "react";
import Image from "next/image";
import { FaHeart, FaShareAlt } from "react-icons/fa";

import Style from "./NFTDetailsImg.module.css";
import image from "/img/thumbnail.png";

const NFTDetailsImg = ({ nft, isLiked, setIsLiked }) => {
  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_wrapper}>
          <Image
            src={image}
            alt="thumbnail"
            width={600}
            height={600}
            className={Style.NFTDetailsImg_box_img}
            priority
          />
          <div className={Style.NFTDetailsImg_box_overlay}>
            <div className={Style.NFTDetailsImg_box_overlay_content}>
              <h3 className={Style.NFTDetailsImg_box_overlay_title}>
                {nft?.name || "Awesome NFT"}
              </h3>
              <p className={Style.NFTDetailsImg_box_overlay_description}>
                {nft?.description || "A unique digital collectible"}
              </p>
            </div>
          </div>
        </div>
        
        <div className={Style.NFTDetailsImg_box_actions}>
          <button 
            className={`${Style.NFTDetailsImg_box_like} ${isLiked ? Style.active : ''}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <FaHeart className={Style.NFTDetailsImg_box_like_icon} />
            <span>{nft?.likes || 0}</span>
          </button>

          <button className={Style.NFTDetailsImg_box_share}>
            <FaShareAlt className={Style.NFTDetailsImg_box_share_icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTDetailsImg;
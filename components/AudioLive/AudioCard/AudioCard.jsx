"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

//INTERNAL IMPORT
import Style from "./AudioCard.module.css";
import images from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile";

const AudioCard = ({ card }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleLike = () => setIsLiked(!isLiked);

  return (
    <div className={Style.audioCard}>
      <div className={Style.audioCard_box}>
        <div className={Style.audioCard_box_img}>
          <Image
            src={card.background}
            alt="audio nft"
            width={500}
            height={500}
            className={Style.audioCard_box_img_img}
          />
        </div>

        <div className={Style.audioCard_box_content}>
          <div className={Style.audioCard_box_content_top}>
            <div className={Style.audioCard_box_content_top_like} onClick={toggleLike}>
              <LikeProfile />
              <span>{card.likes}</span>
            </div>
            <div className={Style.audioCard_box_content_top_creator}>
              <Image
                src={card.user}
                alt="creator"
                width={40}
                height={40}
                className={Style.creator_img}
              />
              <p>{card.creator}</p>
            </div>
          </div>

          <div className={Style.audioCard_box_content_title}>
            <h3>{card.title}</h3>
            <p className={Style.price}>{card.price}</p>
          </div>

          <div className={Style.audioCard_box_content_player}>
            <div className={Style.audio_wave}>
              <Image
                src={images.musiceWave}
                alt="wave"
                width={200}
                height={30}
              />
            </div>
            <div className={Style.audio_controls}>
              <button className={Style.playButton} onClick={togglePlay}>
                {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
              </button>
              <span className={Style.duration}>{card.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
"use client";
import React from "react";
import Image from "next/image";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";

//INTERNAL IMPORT
import Style from "./AudioLive.module.css";
import images from "../../img";
import AudioCard from "./AudioCard/AudioCard";

const AudioLive = () => {
  const audioCards = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      title: "Distant Galaxy",
      creator: "Moon Dancer",
      price: "1.00 ETH",
      likes: 243,
      duration: "2:34"
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      title: "Life on Edena",
      creator: "Nebula Kid",
      price: "2.25 ETH",
      likes: 189,
      duration: "3:42"
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      title: "NFT Gaming",
      creator: "Spaceone",
      price: "4.50 ETH",
      likes: 324,
      duration: "1:56"
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      title: "Crypto Punk",
      creator: "CyberKid",
      price: "3.80 ETH",
      likes: 432,
      duration: "4:12"
    }
  ];

  return (
    <div className={Style.audioLive}>
      <div className={Style.audioLive_box}>
        <div className={Style.audioLive_box_header}>
          <h2>Audio Collection</h2>
          <div className={Style.audioLive_box_filtering}>
            <div className={Style.audioLive_box_filtering_box}>
              <div className={Style.audioLive_box_filtering_box_left}>
                <button>NFTs</button>
                <button>Music</button>
                <button>Sports</button>
              </div>

              <div className={Style.audioLive_box_filtering_box_right}>
                <span>
                  <FaRegClock /> Recently Active
                </span>
                <span>
                  <AiFillHeart /> Most Liked
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={Style.audioLive_box_items}>
          {audioCards.map((card, i) => (
            <AudioCard key={i + 1} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioLive;
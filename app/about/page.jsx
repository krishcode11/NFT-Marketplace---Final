"use client";
import React from 'react';
import Image from 'next/image';
import Style from './about.module.css';
import images from '../../img';

const About = () => {
  return (
    <div className={Style.about}>
      <div className={Style.about_box}>
        <div className={Style.about_box_hero}>
          <div className={Style.about_box_hero_left}>
            <h1>👋 About Us</h1>
            <p>
              Welcome to our NFT Marketplace, where digital art meets blockchain technology. 
              We're passionate about creating a space where artists and collectors can connect, 
              trade, and celebrate unique digital assets.
            </p>
          </div>
          <div className={Style.about_box_hero_right}>
            <Image src={images.hero} alt="Hero" width={600} height={600} />
          </div>
        </div>

        <div className={Style.about_box_title}>
          <h2>🚀 Our Mission</h2>
          <p>
            To revolutionize the digital art space by providing a secure, transparent, 
            and user-friendly platform for NFT creation, trading, and collection.
          </p>
        </div>

        <div className={Style.about_box_cards}>
          <div className={Style.about_box_card}>
            <h3>🎨 For Artists</h3>
            <p>
              Showcase your digital creations to a global audience and earn from your artwork 
              through primary sales and royalties on secondary trades.
            </p>
          </div>

          <div className={Style.about_box_card}>
            <h3>💎 For Collectors</h3>
            <p>
              Discover unique digital assets, build your collection, and join a community 
              of passionate NFT enthusiasts.
            </p>
          </div>

          <div className={Style.about_box_card}>
            <h3>🤝 For Community</h3>
            <p>
              Engage with creators, participate in exclusive drops, and help shape the 
              future of digital ownership.
            </p>
          </div>
        </div>

        <div className={Style.about_box_facts}>
          <div className={Style.about_box_fact}>
            <h4>100K+</h4>
            <p>Active Users</p>
          </div>
          <div className={Style.about_box_fact}>
            <h4>500K+</h4>
            <p>NFTs Created</p>
          </div>
          <div className={Style.about_box_fact}>
            <h4>$10M+</h4>
            <p>Trading Volume</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 
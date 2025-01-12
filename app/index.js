import React from "react";

import Style from "../styles/index.module.css";
import { HeroSection, Service, BigNFTSlider, Subscribe, Title, Category, Filter, Collection, FollowerTab, AudioLive, Slider, Brand, Video } from "../components/components/index";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service /> 
      <BigNFTSlider /> 
      <Slider />
      <AudioLive 
      heading="Latest Audio" 
      paragraph="Listen to the latest audio from our collection." />
      <Title />
      <Subscribe />
      <Filter 
      heading="Featured NFTs" 
      paragraph="Discover our latest NFT collection, featuring unique digital art and collectibles." />
      <Title 
      heading="Our Collection" 
      paragraph="Discover our latest NFT collection, featuring unique digital art and collectibles." />
      <Collection />
      <Title 
      heading="Top Categories" 
      paragraph="Explore our top categories of NFTs, including art, collectibles, and more." />
      <Category />
      <FollowerTab />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
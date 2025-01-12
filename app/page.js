"use client";
import { useContext, useState } from 'react';
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

// INTERNAL IMPORT
import { NavBar } from "../components/componentsindex";
import Footer from "../components/Footer/Footer";
import HeroSection from "../components/HeroSection/HeroSection";
import Service from "../components/Service/Service";
import BigNFTSlider from "../components/BigNFTSlider/BigNFTSlider";
import Subscribe from "../components/Subscribe/Subscribe";
import Title from "../components/Title/Title";
import Category from "../components/Category/Category";
import Filter from "../components/Filter/Filter";
import NFTCard from "../components/NFTCard/NFTCard";
import Collection from "../components/Collection/Collection";
import FollowerTab from "../components/FollowerTab/FollowerTab";
import AudioLive from "../components/AudioLive/AudioLive";
import LikeProfile from "../components/LikeProfile/LikeProfile";
import Slider from "../components/Slider/Slider";
import Brand from "../components/Brand/Brand";
import Video from "../components/Video/Video";

const Home = () => {
  const { titleData, connectWallet } = useContext(NFTMarketplaceContext);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    try {
      await connectWallet();
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <NavBar onConnect={handleConnect} />
      <HeroSection />
      <Service />
      <BigNFTSlider /> 
      <AudioLive 
        heading="Latest Audio" 
        paragraph="Listen to the latest audio from our collection." 
      />
      <LikeProfile />
      <Slider />
      <Subscribe />
      <Brand />
      <Video />
      <Collection />
      <FollowerTab />
      <Filter 
        heading="Featured NFTs" 
        paragraph="Discover our latest NFT collection, featuring unique digital art and collectibles." 
      />
      <NFTCard />
      <Title 
        heading="Our Collection" 
        paragraph="Discover our latest NFT collection, featuring unique digital art and collectibles." 
      />
      <Category /> 
      <Footer />
    </main>
  );
};

export default Home;
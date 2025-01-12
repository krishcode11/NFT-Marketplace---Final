import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";

const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>

        {/* Service Item 1: Browse & Buy */}
        <div className={Style.service_box_item}>
          <Image
            src={images.service2}
            alt="Browse & Buy"
            width={70}
            height={70}
            className={Style.service_image}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 1</span>
          </p>
          <h3>Browse & Buy</h3>
          <p>
            Explore exclusive collections and buy NFTs from your favorite creators.
          </p>
        </div>

        {/* Service Item 2: Connect Wallet */}
        <div className={Style.service_box_item}>
          <Image
            src={images.service3}
            alt="Connect Wallet"
            width={70}
            height={70}
            className={Style.service_image}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 2</span>
          </p>
          <h3>Connect Wallet</h3>
          <p>
            Connect your wallet seamlessly to access all marketplace features.
          </p>
        </div>

        {/* Service Item 3: Start Trading */}
        <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="Start Trading"
            width={70}
            height={70}
            className={Style.service_image}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 3</span>
          </p>
          <h3>Start Trading</h3>
          <p>
            Begin your NFT journey by trading, selling, and profiting in the marketplace.
          </p>
        </div>

        {/* Service Item 4: Create NFT */}
        <div className={Style.service_box_item}>
          <Image
            src={images.service2} // Replace with an image for creating NFTs
            alt="Create NFT"
            width={70}
            height={70}
            className={Style.service_image}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 4</span>
          </p>
          <h3>Create NFT</h3>
          <p>
            Create your own NFTs with ease by uploading digital art and setting your
            desired price.
          </p>
        </div>

        {/* Service Item 5: Buy & Sell NFTs */}
        <div className={Style.service_box_item}>
          <Image
            src={images.service3} // Replace with an image for buying/selling NFTs
            alt="Buy & Sell NFTs"
            width={70}
            height={70}
            className={Style.service_image}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 5</span>
          </p>
          <h3>Buy & Sell NFTs</h3>
          <p>
            Browse and purchase NFTs, or list your own for sale in the marketplace.
          </p>
        </div>

        {/* Service Item 7: NFT Game */}
        <div className={Style.service_box_item}>
          <Image
            src={images.service1} // Replace with an image for NFT games
            alt="NFT Game"
            width={70}
            height={70}
            className={Style.service_image}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 6</span>
          </p>
          <h3>NFT Game</h3>
          <p>
            Play games that offer rewards in NFTs and interact with unique gaming ecosystems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;

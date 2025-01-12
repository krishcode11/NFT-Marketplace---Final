import React from "react";

//INTERNAL IMPORTS
import Style from "../styles/collection.module.css";
import images from "../img";
import { Banner, CollectionProfile, NFTCardTwo } from "../collectionPage/collectionindex";
import {Slider, Brand} from "../components/componentsindex";
import Filter from "../components/Filter/Filter";

const collection = () => {
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <NFTCardTwo />
      <Slider />
      <Brand />
      <Filter />
    </div>
  )
}

export default collection
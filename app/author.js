import React, { useState } from "react";

// INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner } from "../collectionPage/collectionindex";
import { Brand, Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";

const Author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
  ];

  const [tabState, setTabState] = useState({
    collectiables: true,
    created: false,
    like: false,
    follower: false,
    following: false,
  });

  const handleTabChange = (tabName) => {
    setTabState({
      collectiables: false,
      created: false,
      like: false,
      follower: false,
      following: false,
      [tabName]: true,
    });
  };

  return (
    <div className={Style.authorContainer}>
      <Banner bannerImage={images.creatorbackground2} />

      <div className={Style.profileSection}>
        <AuthorProfileCard />
      </div>

      <div className={Style.tabsSection}>
        <AuthorTaps onTabChange={handleTabChange} />
      </div>

      <div className={Style.nftCardSection}>
        <AuthorNFTCardBox {...tabState} />
      </div>

      <Title
        heading="Popular Creators"
        paragraph="Click on the music icon and enjoy NFT music or audio."
      />

      <div className={Style.popularCreatorsSection}>
        {followerArray.map((el, i) => (
          <FollowerTabCard key={i} el={el} />
        ))}
      </div>

      <div className={Style.brandSection}>
        <Brand />
      </div>
    </div>
  );
};

export default Author;

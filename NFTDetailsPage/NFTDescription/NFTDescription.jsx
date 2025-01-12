import React from "react";
import { MdVerified } from "react-icons/md";
import Style from "./NFTDescription.module.css";

const NFTDescription = ({ nft }) => {
  return (
    <div className={Style.NFTDescription}>
      <div className={Style.header}>
        <h1>{nft.name}</h1>
        <div className={Style.creatorInfo}>
          <span>Created by</span>
          <div className={Style.creator}>
            {nft.creator}
            {nft.verified && <MdVerified className={Style.verifiedIcon} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
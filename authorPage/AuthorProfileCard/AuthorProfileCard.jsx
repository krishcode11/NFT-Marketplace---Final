"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";

const AuthorProfileCard = () => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const [copied, setCopied] = useState(false);
  const addressRef = useRef(null);

  const walletAddress = "0x829BD824B03D092293333..A830";

  //copyAddress function
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const openShare = () => {
    setShare(prev => !prev);
    if (report) setReport(false);
  };

  const openReport = () => {
    setReport(prev => !prev);
    if (share) setShare(false);
  };

  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          <Image
            src={images.nft_image_1}
            className={Style.AuthorProfileCard_box_img_img}
            alt="NFT IMAGES"
            width={220}
            height={220}
            priority
          />
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          <h2>
            Dony Herrera
            <span className={Style.verifiedBadge}>
              <MdVerified />
            </span>
          </h2>

          <div className={Style.AuthorProfileCard_box_info_address}>
            <input
              type="text"
              value={walletAddress}
              readOnly
              ref={addressRef}
            />
            <button 
              onClick={copyAddress}
              className={`${Style.AuthorProfileCard_box_info_address_icon} ${copied ? Style.copied : ''}`}
              title={copied ? "Copied!" : "Copy address"}
            >
              <FiCopy />
              {copied && <span className={Style.copiedTooltip}>Copied!</span>}
            </button>
          </div>

          <p>
            Punk #4786 / An OG Cryptopunk Collector, hoarder of NFTs.
            Contributing to @ether_cards, an NFT Monetization Platform.
          </p>

          <div className={Style.AuthorProfileCard_box_info_social}>
            <a href="#" aria-label="Facebook">
              <TiSocialFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <TiSocialInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <TiSocialLinkedin />
            </a>
            <a href="#" aria-label="YouTube">
              <TiSocialYoutube />
            </a>
          </div>
        </div>

        <div className={Style.AuthorProfileCard_box_share}>
          <Button btnName="Follow" handleClick={() => {}} />
          <button 
            onClick={openShare}
            className={Style.AuthorProfileCard_box_share_icon}
            aria-label="Share"
          >
            <MdCloudUpload />
          </button>

          {share && (
            <div className={Style.AuthorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook />
                </span>
                Facebook
              </p>
              <p>
                <span>
                  <TiSocialInstagram />
                </span>
                Instagram
              </p>
              <p>
                <span>
                  <TiSocialLinkedin />
                </span>
                LinkedIn
              </p>
              <p>
                <span>
                  <TiSocialYoutube />
                </span>
                YouTube
              </p>
            </div>
          )}

          <button 
            onClick={openReport}
            className={Style.AuthorProfileCard_box_share_icon}
            aria-label="More options"
          >
            <BsThreeDots />
          </button>

          {report && (
            <div className={Style.AuthorProfileCard_box_share_report}>
              <p>
                <span>
                  <MdOutlineReportProblem />
                </span>
                Report abuse
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
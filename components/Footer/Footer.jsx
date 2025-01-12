"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiCustomerService2Line, RiInformationLine, RiUserAddLine, RiLoginCircleLine, RiVipCrownLine } from 'react-icons/ri';
import { FaDiscord, FaTwitter, FaTelegram, FaGithub } from 'react-icons/fa';
import Style from "./Footer.module.css";
import images from "../../img";

const Footer = () => {
  const helpCenterLinks = [
    {
      name: "About Us",
      link: "/about",
      icon: <RiInformationLine />,
    },
    {
      name: "Contact Us",
      link: "/contact",
      icon: <RiCustomerService2Line />,
    },
    {
      name: "Sign Up",
      link: "/signup",
      icon: <RiUserAddLine />,
    },
    {
      name: "Sign In",
      link: "/signin",
      icon: <RiLoginCircleLine />,
    },
    {
      name: "Subscription",
      link: "/subscription",
      icon: <RiVipCrownLine />,
    },
  ];

  const socialLinks = [
    { name: "Discord", icon: <FaDiscord />, link: "#" },
    { name: "Twitter", icon: <FaTwitter />, link: "#" },
    { name: "Telegram", icon: <FaTelegram />, link: "#" },
    { name: "GitHub", icon: <FaGithub />, link: "#" },
  ];

  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer logo" height={100} width={100} />
          <p>
            The world's first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </p>
          <div className={Style.footer_social}>
            {socialLinks.map((item, i) => (
              <a 
                href={item.link} 
                key={i + 1} 
                className={Style.footer_social_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <div className={Style.footer_links}>
            {helpCenterLinks.map((item, i) => (
              <Link href={item.link} key={i + 1} className={Style.footer_link}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={Style.footer_box_subscribe}>
          <h3>Subscribe</h3>
          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email *" />
            <button>Subscribe</button>
          </div>
          <div className={Style.footer_subscribe}>
            <p>
              Discover, collect, and sell extraordinary NFTs. Join our newsletter for the latest updates.
            </p>
          </div>
        </div>
      </div>

      <div className={Style.footer_bottom}>
        <div className={Style.footer_box_discover}>
          <p>© 2024 NFT Marketplace. All rights reserved.</p>
          <div className={Style.footer_box_discover_items}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
"use client";
import React from "react";
import Link from 'next/link';
import Style from "./Discover.module.css";

const Discover = () => {
  const discover = [
    {
      name: "Collection",
      link: "/collection",
    },
    {
      name: "Search",
      link: "/search",
    },
    {
      name: "Analytics",
      link: "/analytics",
    },
    {
      name: "Bidding",
      link: "/bidding",
    },
    {
      name: "Bundle Sales",
      link: "/bundle-sales",
    },
    {
      name: "Launchpad",
      link: "/launchpad",
    },
    {
      name: "Upload NFT",
      link: "/uploadNFT",
    },
    {
      name: "Author Profile",
      link: "/author",
    },
    {
      name: "NFT Details",
      link: "/nft-details",
    },
    {
      name: "Account",
      link: "/account",
    },
  ];

  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link 
            href={el.link}
            className={Style.discover_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {el.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;
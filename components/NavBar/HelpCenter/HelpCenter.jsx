"use client";
import React from "react";
import Link from "next/link";
import { RiCustomerService2Line, RiInformationLine, RiUserAddLine, RiLoginCircleLine, RiVipCrownLine } from 'react-icons/ri';
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
  const helpCenterLinks = [
    { name: "About Us", link: "/about", icon: <RiInformationLine /> },
    { name: "Contact Us", link: "/contact", icon: <RiCustomerService2Line /> },
    { name: "Sign Up", link: "/signup", icon: <RiUserAddLine /> },
    { name: "Sign In", link: "/signin", icon: <RiLoginCircleLine /> },
    { name: "Subscription", link: "/subscription", icon: <RiVipCrownLine /> },
  ];

  return (
    <nav className={Style.box}>
      <div className={Style.box_items}>
        {helpCenterLinks.map((item, i) => (
          <Link href={item.link} key={i} className={Style.box_item}>
            <span className={Style.box_item_icon}>{item.icon}</span>
            <span className={Style.box_item_text}>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default HelpCenter;
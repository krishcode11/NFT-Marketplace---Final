"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiUser, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "My Profile",
      link: "/profile",
      icon: <FiUser />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <FiSettings />,
    },
    {
      name: "Help Center",
      link: "/help",
      icon: <FiHelpCircle />,
    },
  ];

  return (
    <div className={Style.profile} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className={Style.profile_box}>
        <button className={Style.profile_button}>
          <Image 
            src={images.user1} 
            alt="profile" 
            width={40} 
            height={40} 
            className={Style.profile_image}
          />
        </button>

        {isOpen && (
          <div className={Style.profile_dropdown}>
            <div className={Style.profile_header}>
              <Image 
                src={images.user1} 
                alt="profile" 
                width={60} 
                height={60} 
                className={Style.profile_header_image}
              />
              <div className={Style.profile_header_info}>
                <h4>Kishan K</h4>
                <p>kishan.k@example.com</p>
              </div>
            </div>

            <div className={Style.profile_menu}>
              {menuItems.map((item, i) => (
                <Link href={item.link} key={i} className={Style.profile_menu_item}>
                  <span className={Style.profile_menu_icon}>{item.icon}</span>
                  <span className={Style.profile_menu_text}>{item.name}</span>
                </Link>
              ))}
            </div>

            <div className={Style.profile_footer}>
              <button className={Style.logout_button}>
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
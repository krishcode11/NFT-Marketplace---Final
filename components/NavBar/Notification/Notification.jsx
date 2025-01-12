"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdNotifications } from "react-icons/md";
import Style from "./Notification.module.css";
import images from "../../../img";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      user: "Kishan.k",
      message: "Started following you",
      image: images.user1,
      time: "3 minutes ago",
      isNew: true,
    },
    {
      id: 2,
      user: "Alex",
      message: "Liked your NFT",
      image: images.user2,
      time: "2 hours ago",
      isNew: true,
    },
    {
      id: 3,
      user: "Sara",
      message: "Commented on your post",
      image: images.user3,
      time: "1 day ago",
      isNew: false,
    },
  ];

  return (
    <div className={Style.notification}>
      <div className={Style.notification_box}>
        <div 
          className={Style.notification_icon} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdNotifications size={24} />
          <span className={Style.notification_badge}>3</span>
        </div>

        {isOpen && (
          <div className={Style.notification_dropdown}>
            <div className={Style.notification_heading}>
              <h4>Notifications</h4>
              <button className={Style.clear_btn}>Clear All</button>
            </div>
            
            <div className={Style.notification_list}>
              {notifications.map((item) => (
                <Link href="/profile" key={item.id} className={Style.notification_item}>
                  <div className={Style.notification_item_img}>
                    <Image src={item.image} alt="profile image" width={40} height={40} />
                  </div>
                  <div className={Style.notification_item_info}>
                    <h5>{item.user}</h5>
                    <p>{item.message}</p>
                    <small>{item.time}</small>
                  </div>
                  {item.isNew && <span className={Style.notification_item_new}></span>}
                </Link>
              ))}
            </div>
            
            <Link href="/notifications" className={Style.view_all}>
              View All Notifications
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
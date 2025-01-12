"use client";
import { useContext, useState, useRef, useEffect } from "react";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Style from "./NavBar.module.css";
import { Button } from "../componentsindex.js";
import Link from "next/link";
import { MdNotifications, MdHelp, MdExplore, MdPerson } from "react-icons/md";
import { Discover, HelpCenter, Profile, Notification } from "./index";

const NavBar = () => {
  const { connectWallet, currentAccount, disconnectWallet } = useContext(NFTMarketplaceContext);
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);

  const discoverRef = useRef(null);
  const helpRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (discoverRef.current && !discoverRef.current.contains(event.target)) {
        setDiscover(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setHelp(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotification(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleWalletClick = () => {
    if (currentAccount) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <Link href="/">
            <div className={Style.logo}>NFT Marketplace</div>
          </Link>
        </div>

        <div className={Style.navbar_container_right}>
          {/* Discover Menu */}
          <div className={Style.discover_box} ref={discoverRef}>
            <div 
              className={Style.nav_button}
              onClick={() => {
                setDiscover(!discover);
                setHelp(false);
                setNotification(false);
                setProfile(false);
              }}
            >
              <MdExplore className={Style.nav_icon} />
              <span>Discover</span>
            </div>
            {discover && (
              <div className={Style.discover_box_items}>
                <Discover />
              </div>
            )}
          </div>

          {/* Help Center Menu */}
          <div className={Style.help_box} ref={helpRef}>
            <div 
              className={Style.nav_button}
              onClick={() => {
                setHelp(!help);
                setDiscover(false);
                setNotification(false);
                setProfile(false);
              }}
            >
              <MdHelp className={Style.nav_icon} />
              <span>Help Center</span>
            </div>
            {help && (
              <div className={Style.help_box_items}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* Notification */}
          <div className={Style.notification_box} ref={notificationRef}>
            <div 
              className={Style.nav_button}
              onClick={() => {
                setNotification(!notification);
                setDiscover(false);
                setHelp(false);
                setProfile(false);
              }}
            >
              <MdNotifications className={Style.nav_icon} />
              <span className={Style.notification_badge}>2</span>
            </div>
            {notification && (
              <div className={Style.notification_box_items}>
                <Notification />
              </div>
            )}
          </div>

          {/* Connect Wallet Button */}
          <div className={Style.connect_wallet_box}>
            <Button 
              btnName={currentAccount 
                ? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}` 
                : "Connect Wallet"
              }
              handleClick={handleWalletClick}
              classStyle={`${Style.connect_wallet_button} ${currentAccount ? Style.connected : ""}`}
            />
          </div>

          {/* Profile */}
          {currentAccount && (
            <div className={Style.profile_box} ref={profileRef}>
              <div 
                className={Style.nav_button}
                onClick={() => {
                  setProfile(!profile);
                  setDiscover(false);
                  setHelp(false);
                  setNotification(false);
                }}
              >
                <MdPerson className={Style.nav_icon} />
                <span>Profile</span>
              </div>
              {profile && (
                <div className={Style.profile_box_items}>
                  <Profile currentAccount={currentAccount} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
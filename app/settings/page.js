"use client";
import { useState, useContext } from "react";
import Style from "./settings.module.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import { MdSecurity, MdNotifications, MdPerson, MdWallet } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";

const Settings = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [notification, setNotification] = useState({
    nftSales: true,
    nftUpdates: true,
    newListings: false,
    priceAlerts: true
  });

  const handleNotificationChange = (setting) => {
    setNotification(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const formatAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <div className={Style.settings}>
      <div className={Style.settings_container}>
        <div className={Style.settings_header}>
          <h1>Settings</h1>
          <div className={Style.account_info}>
            <FaEthereum />
            <span>{formatAddress(currentAccount)}</span>
          </div>
        </div>

        <div className={Style.settings_content}>
          <div className={Style.settings_sidebar}>
            <button
              className={`${Style.tab} ${activeTab === "profile" ? Style.active : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <MdPerson />
              <span>Profile</span>
            </button>
            <button
              className={`${Style.tab} ${activeTab === "wallet" ? Style.active : ""}`}
              onClick={() => setActiveTab("wallet")}
            >
              <MdWallet />
              <span>Wallet</span>
            </button>
            <button
              className={`${Style.tab} ${activeTab === "notifications" ? Style.active : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              <MdNotifications />
              <span>Notifications</span>
            </button>
            <button
              className={`${Style.tab} ${activeTab === "security" ? Style.active : ""}`}
              onClick={() => setActiveTab("security")}
            >
              <MdSecurity />
              <span>Security</span>
            </button>
          </div>

          <div className={Style.settings_main}>
            {activeTab === "profile" && (
              <div className={Style.section}>
                <h2>Profile Settings</h2>
                <div className={Style.form_group}>
                  <label>Display Name</label>
                  <input type="text" placeholder="Enter your display name" />
                </div>
                <div className={Style.form_group}>
                  <label>Bio</label>
                  <textarea placeholder="Tell us about yourself" rows={4} />
                </div>
                <div className={Style.form_group}>
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                <button className={Style.save_button}>Save Changes</button>
              </div>
            )}

            {activeTab === "wallet" && (
              <div className={Style.section}>
                <h2>Wallet Settings</h2>
                <div className={Style.wallet_info}>
                  <div className={Style.info_item}>
                    <span>Connected Wallet</span>
                    <p>{formatAddress(currentAccount)}</p>
                  </div>
                  <div className={Style.info_item}>
                    <span>Network</span>
                    <p>Ethereum Mainnet</p>
                  </div>
                </div>
                <button className={Style.disconnect_button}>Disconnect Wallet</button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className={Style.section}>
                <h2>Notification Preferences</h2>
                <div className={Style.notification_settings}>
                  <div className={Style.notification_item}>
                    <div>
                      <h3>NFT Sales</h3>
                      <p>Get notified when your NFTs are sold</p>
                    </div>
                    <label className={Style.switch}>
                      <input
                        type="checkbox"
                        checked={notification.nftSales}
                        onChange={() => handleNotificationChange("nftSales")}
                      />
                      <span className={Style.slider}></span>
                    </label>
                  </div>
                  <div className={Style.notification_item}>
                    <div>
                      <h3>NFT Updates</h3>
                      <p>Get notified about your NFT status changes</p>
                    </div>
                    <label className={Style.switch}>
                      <input
                        type="checkbox"
                        checked={notification.nftUpdates}
                        onChange={() => handleNotificationChange("nftUpdates")}
                      />
                      <span className={Style.slider}></span>
                    </label>
                  </div>
                  <div className={Style.notification_item}>
                    <div>
                      <h3>New Listings</h3>
                      <p>Get notified about new NFT listings</p>
                    </div>
                    <label className={Style.switch}>
                      <input
                        type="checkbox"
                        checked={notification.newListings}
                        onChange={() => handleNotificationChange("newListings")}
                      />
                      <span className={Style.slider}></span>
                    </label>
                  </div>
                  <div className={Style.notification_item}>
                    <div>
                      <h3>Price Alerts</h3>
                      <p>Get notified about price changes</p>
                    </div>
                    <label className={Style.switch}>
                      <input
                        type="checkbox"
                        checked={notification.priceAlerts}
                        onChange={() => handleNotificationChange("priceAlerts")}
                      />
                      <span className={Style.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className={Style.section}>
                <h2>Security Settings</h2>
                <div className={Style.security_info}>
                  <div className={Style.info_item}>
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                    <button className={Style.enable_button}>Enable 2FA</button>
                  </div>
                  <div className={Style.info_item}>
                    <h3>Connected Devices</h3>
                    <p>Manage devices that have access to your account</p>
                    <button className={Style.view_button}>View Devices</button>
                  </div>
                  <div className={Style.info_item}>
                    <h3>Activity Log</h3>
                    <p>View your account activity and login history</p>
                    <button className={Style.view_button}>View Activity</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 
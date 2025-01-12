import React from "react";
import { FaEthereum, FaHistory, FaRegClock } from "react-icons/fa";
import Style from "./NFTTabs.module.css";

const NFTTabs = ({ activeTab, setActiveTab, nft }) => {
  return (
    <div className={Style.NFTTabs}>
      <div className={Style.tabButtons}>
        <button 
          className={`${Style.tabButton} ${activeTab === 'details' ? Style.active : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button 
          className={`${Style.tabButton} ${activeTab === 'history' ? Style.active : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      <div className={Style.tabContent}>
        {activeTab === 'details' ? (
          <div className={Style.description}>
            <h3>Description</h3>
            <p>{nft.description}</p>
            <div className={Style.properties}>
              <h3>Properties</h3>
              <div className={Style.propertiesGrid}>
                <div className={Style.property}>
                  <span>Owner</span>
                  <p>{nft.owner}</p>
                </div>
                <div className={Style.property}>
                  <span>Collection</span>
                  <p>{nft.collection?.name || "Unknown"}</p> {/* Dynamically fetch collection name */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={Style.history}>
            {nft.history.map((item, index) => (
              <div key={index} className={Style.historyItem}>
                <div className={Style.historyIcon}>
                  {item.event === 'Listed' ? <FaRegClock /> : 
                   item.event === 'Transfer' ? <FaHistory /> : 
                   <FaEthereum />}
                </div>
                <div className={Style.historyDetails}>
                  <h4>{item.event}</h4>
                  <p>
                    {item.price ? `${item.price} ETH` : 
                     item.from ? `From ${item.from} to ${item.to}` :
                     `By ${item.by}`}
                  </p>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTTabs;

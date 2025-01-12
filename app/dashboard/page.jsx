"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Style from "./Dashboard.module.css";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { MdCollections, MdSell, MdHistory, MdHelpCenter } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";

const Dashboard = () => {
  const { currentAccount, fetchMyNFTsOrListedNFTs, getCreatorDetails } = useContext(NFTMarketplaceContext);
  const [activeTab, setActiveTab] = useState("collected");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    collected: 0,
    listed: 0,
    totalValue: 0,
    totalSales: 0
  });

  useEffect(() => {
    if (currentAccount) {
      loadDashboardData();
    }
  }, [currentAccount, activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch NFTs based on active tab
      const items = await fetchMyNFTsOrListedNFTs(activeTab === "listed");
      setNfts(items);

      // Calculate stats
      const totalValue = items.reduce((sum, nft) => sum + parseFloat(nft.price || 0), 0);
      const statsData = {
        collected: items.filter(nft => !nft.isListed).length,
        listed: items.filter(nft => nft.isListed).length,
        totalValue,
        totalSales: items.filter(nft => nft.sold).length
      };
      setStats(statsData);

    } catch (error) {
      console.error("Error loading dashboard:", error);
      setError("Error loading dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  if (!currentAccount) {
    return (
      <div className={Style.connect_wallet}>
        <FaWallet className={Style.wallet_icon} />
        <h2>Connect your wallet to view your dashboard</h2>
        <p>Connect your wallet to see your NFT collection, listings, and trading history.</p>
      </div>
    );
  }

  return (
    <div className={Style.dashboard}>
      <div className={Style.dashboard_container}>
        <div className={Style.dashboard_header}>
          <h1>My Profile</h1>
          <div className={Style.header_actions}>
            <Link href="/help" className={Style.help_link}>
              <MdHelpCenter />
              <span>Help Center</span>
            </Link>
            <div className={Style.account_info}>
              <FaEthereum />
              <span>{formatAddress(currentAccount)}</span>
            </div>
          </div>
        </div>

        <div className={Style.stats_grid}>
          <div className={Style.stat_card}>
            <MdCollections className={Style.stat_icon} />
            <div className={Style.stat_info}>
              <span className={Style.stat_value}>{stats.collected}</span>
              <span className={Style.stat_label}>Collected NFTs</span>
            </div>
          </div>
          <div className={Style.stat_card}>
            <MdSell className={Style.stat_icon} />
            <div className={Style.stat_info}>
              <span className={Style.stat_value}>{stats.listed}</span>
              <span className={Style.stat_label}>Listed NFTs</span>
            </div>
          </div>
          <div className={Style.stat_card}>
            <FaEthereum className={Style.stat_icon} />
            <div className={Style.stat_info}>
              <span className={Style.stat_value}>{stats.totalValue.toFixed(2)} ETH</span>
              <span className={Style.stat_label}>Total Value</span>
            </div>
          </div>
          <div className={Style.stat_card}>
            <MdHistory className={Style.stat_icon} />
            <div className={Style.stat_info}>
              <span className={Style.stat_value}>{stats.totalSales}</span>
              <span className={Style.stat_label}>Total Sales</span>
            </div>
          </div>
        </div>

        <div className={Style.tabs}>
          <button
            className={`${Style.tab} ${activeTab === "collected" ? Style.active : ""}`}
            onClick={() => setActiveTab("collected")}
          >
            Collected
          </button>
          <button
            className={`${Style.tab} ${activeTab === "listed" ? Style.active : ""}`}
            onClick={() => setActiveTab("listed")}
          >
            Listed
          </button>
        </div>

        {error && <p className={Style.error}>{error}</p>}

        {loading ? (
          <div className={Style.loading}>Loading your NFTs...</div>
        ) : !nfts || nfts.length === 0 ? (
          <div className={Style.no_items}>
            <MdCollections className={Style.empty_icon} />
            <h3>No NFTs found</h3>
            <p>
              {activeTab === "collected"
                ? "You haven't collected any NFTs yet"
                : "You don't have any NFTs listed for sale"}
            </p>
          </div>
        ) : (
          <div className={Style.nft_grid}>
            {nfts.map((nft) => (
              <Link href={`/nft-details/${nft.tokenId}`} key={nft.tokenId} className={Style.nft_card}>
                <div className={Style.nft_image_container}>
                  <Image
                    src={nft.image || "/default-nft.jpg"}
                    alt={nft.name}
                    width={300}
                    height={300}
                    className={Style.nft_image}
                  />
                  {nft.isListed && (
                    <div className={Style.status_badge}>
                      Listed
                    </div>
                  )}
                </div>
                <div className={Style.nft_info}>
                  <h3>{nft.name}</h3>
                  <div className={Style.nft_price}>
                    <FaEthereum />
                    <span>{nft.price} ETH</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
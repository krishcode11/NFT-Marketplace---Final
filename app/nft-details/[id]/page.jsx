"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";
import { nftAPI } from "@/services/api";
import Style from "./NFTDetails.module.css";
import { FaEthereum, FaUserCircle, FaTag } from "react-icons/fa";
import { MdVerified, MdTimer } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";

const NFTDetails = () => {
  const { id } = useParams();
  const { getNFTDetails, buyNFT, getCreatorDetails, resellNFT, currentAccount } = useContext(NFTMarketplaceContext);
  const [nft, setNft] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchasing, setPurchasing] = useState(false);
  const [resellPrice, setResellPrice] = useState("");
  const [isReselling, setIsReselling] = useState(false);
  const [showResellModal, setShowResellModal] = useState(false);

  useEffect(() => {
    const fetchNFTDetails = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch blockchain data
        const blockchainData = await getNFTDetails(id);
        
        // Fetch additional metadata from backend
        const { data: backendData } = await nftAPI.getNFTById(id);

        // Merge data from both sources
        setNft({
          ...blockchainData,
          ...backendData,
          price: blockchainData.price, // Prioritize blockchain price
          owner: blockchainData.owner, // Prioritize blockchain owner
        });

        if (nft?.creator) {
          const creatorData = await getCreatorDetails(nft.creator);
          setCreator(creatorData);
        }
      } catch (error) {
        console.error("Error fetching NFT details:", error);
        setError("Error fetching NFT details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNFTDetails();
    }
  }, [id, getNFTDetails]);

  const formatAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const handleBuyNFT = async () => {
    try {
      setLoading(true);
      setError("");

      // Execute blockchain transaction
      await buyNFT(nft);
      
      // Update backend about the purchase
      await nftAPI.updateNFT(id, {
        status: "sold",
        lastSoldPrice: nft.price,
        lastSoldDate: new Date().toISOString()
      });

      // Refresh NFT details
      await fetchNFTDetails();
    } catch (error) {
      console.error("Error buying NFT:", error);
      setError("Error purchasing NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResell = async () => {
    if (!resellPrice || resellPrice <= 0) {
      setError("Please enter a valid price");
      return;
    }

    try {
      setIsReselling(true);
      setError("");
      await resellNFT(nft.tokenId, resellPrice);
      setShowResellModal(false);
      await fetchNFTDetails();
    } catch (error) {
      console.error("Error reselling NFT:", error);
      setError("Error reselling NFT. Please try again.");
    } finally {
      setIsReselling(false);
    }
  };

  const isOwner = currentAccount && nft?.owner && currentAccount.toLowerCase() === nft.owner.toLowerCase();

  if (loading) {
    return <div className={Style.loading}>Loading NFT details...</div>;
  }

  if (error) {
    return <div className={Style.error}>{error}</div>;
  }

  if (!nft) {
    return <div className={Style.error}>NFT not found</div>;
  }

  return (
    <div className={Style.nft_details}>
      <div className={Style.nft_details_container}>
        <div className={Style.nft_details_img}>
          <Image
            src={nft.image || "/default-nft.jpg"}
            alt={nft.name}
            width={600}
            height={600}
            className={Style.nft_image}
          />
        </div>

        <div className={Style.nft_details_info}>
          <div className={Style.nft_details_header}>
            <h1>{nft.name}</h1>
            <div className={Style.nft_details_creator}>
              <span>Created by</span>
              <Link href={`/profile/${nft.creator}`} className={Style.creator_info}>
                {creator?.profileImage ? (
                  <Image
                    src={creator.profileImage}
                    alt={creator.name || "Creator"}
                    width={30}
                    height={30}
                    className={Style.creator_image}
                  />
                ) : (
                  <FaUserCircle className={Style.creator_icon} />
                )}
                <span>{creator?.name || formatAddress(nft.creator)}</span>
                {creator?.isVerified && <MdVerified className={Style.verified_icon} />}
              </Link>
            </div>
          </div>

          <div className={Style.nft_details_stats}>
            <div className={Style.stat_item}>
              <BiTransfer />
              <span>Token ID: {nft.tokenId}</span>
            </div>
            <div className={Style.stat_item}>
              <MdTimer />
              <span>Listed: {nft.listingTime ? new Date(nft.listingTime * 1000).toLocaleDateString() : 'Not listed'}</span>
            </div>
            {creator && (
              <div className={Style.stat_item}>
                <FaEthereum />
                <span>Royalty: {creator.royaltyPercentage}%</span>
              </div>
            )}
          </div>

          <div className={Style.nft_details_description}>
            <h2>Description</h2>
            <p>{nft.description}</p>
          </div>

          <div className={Style.nft_details_price}>
            <div className={Style.price_container}>
              <FaEthereum className={Style.eth_icon} />
              <span className={Style.price_amount}>{nft.price} ETH</span>
            </div>
            {isOwner ? (
              <button
                className={Style.resell_button}
                onClick={() => setShowResellModal(true)}
                disabled={nft.isForSale}
              >
                <FaTag /> Resell NFT
              </button>
            ) : (
              <button
                className={Style.buy_button}
                onClick={handleBuyNFT}
                disabled={purchasing || !nft.isForSale}
              >
                {purchasing ? "Processing..." : nft.isForSale ? "Buy Now" : "Not for Sale"}
              </button>
            )}
          </div>

          {showResellModal && (
            <div className={Style.modal_overlay}>
              <div className={Style.modal}>
                <h2>Resell NFT</h2>
                <div className={Style.modal_content}>
                  <div className={Style.input_group}>
                    <label>Price (ETH)</label>
                    <div className={Style.price_input}>
                      <FaEthereum />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={resellPrice}
                        onChange={(e) => setResellPrice(e.target.value)}
                        placeholder="Enter price in ETH"
                      />
                    </div>
                  </div>
                  {error && <p className={Style.modal_error}>{error}</p>}
                  <div className={Style.modal_actions}>
                    <button
                      className={Style.cancel_button}
                      onClick={() => setShowResellModal(false)}
                      disabled={isReselling}
                    >
                      Cancel
                    </button>
                    <button
                      className={Style.confirm_button}
                      onClick={handleResell}
                      disabled={isReselling}
                    >
                      {isReselling ? "Processing..." : "Confirm Resell"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {nft.attributes && (
            <div className={Style.nft_details_attributes}>
              <h2>Attributes</h2>
              <div className={Style.attributes_grid}>
                {nft.attributes.map((attr, index) => (
                  <div key={index} className={Style.attribute_item}>
                    <span className={Style.attribute_type}>{attr.trait_type}</span>
                    <span className={Style.attribute_value}>{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={Style.nft_details_history}>
            <h2>Transaction History</h2>
            <div className={Style.history_list}>
              {nft.history?.map((event, index) => (
                <div key={index} className={Style.history_item}>
                  <div className={Style.history_type}>{event.type}</div>
                  <div className={Style.history_details}>
                    <span>{event.from}</span>
                    <BiTransfer />
                    <span>{event.to}</span>
                  </div>
                  <div className={Style.history_price}>
                    <FaEthereum />
                    <span>{event.price} ETH</span>
                  </div>
                  <div className={Style.history_date}>
                    {new Date(event.timestamp * 1000).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
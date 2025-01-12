"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Style from "./search.module.css";
import { BsSearch } from "react-icons/bs";

const SearchPage = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    try {
      setLoading(true);
      setError("");
      const items = await fetchNFTs();
      setNfts(items);
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setError("Error loading NFTs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredNFTs = (nfts || []).filter((nft) => {
    if (!nft) return false;
    const tokenURI = nft.tokenURI || '';
    const name = nft.name || '';
    const description = nft.description || '';
    const searchContent = `${name} ${description} ${tokenURI}`.toLowerCase();
    return searchContent.includes(searchTerm.toLowerCase());
  });

  return (
    <div className={Style.search}>
      <div className={Style.search_box}>
        <div className={Style.search_box_input}>
          <BsSearch className={Style.search_box_input_icon} />
          <input
            type="text"
            placeholder="Search NFTs by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && <p className={Style.error}>{error}</p>}

      <div className={Style.search_items}>
        {loading ? (
          <p className={Style.loading}>Loading NFTs...</p>
        ) : filteredNFTs.length === 0 ? (
          <p className={Style.no_result}>
            {searchTerm ? "No NFTs found matching your search" : "No NFTs available"}
          </p>
        ) : (
          <div className={Style.search_items_grid}>
            {filteredNFTs.map((nft) => (
              <div key={nft.tokenId} className={Style.search_item}>
                <div className={Style.search_item_img}>
                  <Image
                    src={nft.image || "default-nft-image.jpg"}
                    alt={nft.name}
                    width={300}
                    height={300}
                    objectFit="cover"
                  />
                </div>
                <div className={Style.search_item_info}>
                  <h3>{nft.name}</h3>
                  <p>{nft.description}</p>
                  <div className={Style.search_item_price}>
                    <span>{nft.price} ETH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
"use client";
import { useState, useContext, useEffect } from 'react';
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';
import Style from './Bidding.module.css';
import { MdTimer, MdLocalOffer, MdHistory } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';
import Image from 'next/image';

const Bidding = () => {
    const { currentAccount } = useContext(NFTMarketplaceContext);
    const [activeTab, setActiveTab] = useState('active');
    const [bidAmount, setBidAmount] = useState('');

    // Sample data - replace with actual data from smart contract
    const activeBids = [
        {
            id: 1,
            name: "Cosmic Perspective #123",
            image: "/nft1.jpg",
            currentBid: "1.5",
            endTime: "2h 15m",
            highestBidder: "0x1234...5678",
            minimumBid: "1.6",
            bids: 12
        },
        {
            id: 2,
            name: "Digital Dreams #456",
            image: "/nft2.jpg",
            currentBid: "2.8",
            endTime: "5h 30m",
            highestBidder: "0x8765...4321",
            minimumBid: "3.0",
            bids: 8
        }
    ];

    const bidHistory = [
        {
            time: "2 hours ago",
            bidder: "0x1234...5678",
            amount: "1.5",
            status: "highest"
        },
        {
            time: "3 hours ago",
            bidder: "0x8765...4321",
            amount: "1.3",
            status: "outbid"
        }
    ];

    const handleBid = (itemId) => {
        if (!bidAmount) return;
        // Implement bid logic here
        console.log(`Placing bid of ${bidAmount} ETH on item ${itemId}`);
    };

    return (
        <div className={Style.bidding}>
            <div className={Style.bidding_container}>
                {/* Header Section */}
                <div className={Style.header}>
                    <h1>NFT Bidding</h1>
                    <div className={Style.tab_buttons}>
                        <button
                            className={`${Style.tab_button} ${activeTab === 'active' ? Style.active : ''}`}
                            onClick={() => setActiveTab('active')}
                        >
                            Active Auctions
                        </button>
                        <button
                            className={`${Style.tab_button} ${activeTab === 'my-bids' ? Style.active : ''}`}
                            onClick={() => setActiveTab('my-bids')}
                        >
                            My Bids
                        </button>
                    </div>
                </div>

                {/* Active Auctions */}
                <div className={Style.auctions_grid}>
                    {activeBids.map((item) => (
                        <div key={item.id} className={Style.auction_card}>
                            <div className={Style.auction_image}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={300}
                                    height={300}
                                    className={Style.nft_image}
                                />
                                <div className={Style.time_remaining}>
                                    <MdTimer />
                                    <span>{item.endTime}</span>
                                </div>
                            </div>
                            
                            <div className={Style.auction_info}>
                                <h3>{item.name}</h3>
                                
                                <div className={Style.bid_info}>
                                    <div className={Style.current_bid}>
                                        <span>Current Bid</span>
                                        <div className={Style.eth_amount}>
                                            <FaEthereum />
                                            <span>{item.currentBid} ETH</span>
                                        </div>
                                    </div>
                                    <div className={Style.bid_count}>
                                        <MdHistory />
                                        <span>{item.bids} bids</span>
                                    </div>
                                </div>

                                <div className={Style.highest_bidder}>
                                    <span>Highest Bidder:</span>
                                    <span className={Style.address}>{item.highestBidder}</span>
                                </div>

                                <div className={Style.bid_actions}>
                                    <input
                                        type="number"
                                        placeholder={`Min bid ${item.minimumBid} ETH`}
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        className={Style.bid_input}
                                        min={item.minimumBid}
                                        step="0.01"
                                    />
                                    <button
                                        onClick={() => handleBid(item.id)}
                                        className={Style.bid_button}
                                        disabled={!currentAccount}
                                    >
                                        <MdLocalOffer />
                                        Place Bid
                                    </button>
                                </div>
                            </div>

                            {/* Bid History */}
                            <div className={Style.bid_history}>
                                <h4>Bid History</h4>
                                {bidHistory.map((bid, index) => (
                                    <div key={index} className={Style.bid_history_item}>
                                        <div className={Style.bid_history_info}>
                                            <span className={Style.bid_time}>{bid.time}</span>
                                            <span className={Style.bidder_address}>{bid.bidder}</span>
                                        </div>
                                        <div className={Style.bid_amount}>
                                            <FaEthereum />
                                            <span>{bid.amount} ETH</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bidding; 
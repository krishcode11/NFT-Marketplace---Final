"use client";
import { useState, useContext } from 'react';
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';
import Style from './Launchpad.module.css';
import { MdRocket, MdTimer, MdPeople, MdBarChart } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';
import Image from 'next/image';

const Launchpad = () => {
    const { currentAccount } = useContext(NFTMarketplaceContext);
    const [activeTab, setActiveTab] = useState('live');

    // Sample data - replace with actual data from smart contract
    const launches = [
        {
            id: 1,
            name: "Celestial Beings",
            description: "A collection of 10,000 unique celestial beings living on the Ethereum blockchain",
            image: "/nft1.jpg",
            price: "0.08",
            totalSupply: "10,000",
            minted: "6,723",
            startTime: "Live now",
            endTime: "24h remaining",
            creator: "0x1234...5678",
            participants: "3.2K",
            status: "live",
            whitelist: true,
            socialLinks: {
                website: "#",
                twitter: "#",
                discord: "#"
            }
        },
        {
            id: 2,
            name: "Cyber Warriors",
            description: "Enter the cyber realm with 5,000 unique warrior NFTs with special abilities",
            image: "/nft2.jpg",
            price: "0.15",
            totalSupply: "5,000",
            minted: "0",
            startTime: "Starts in 2 days",
            endTime: "7 days duration",
            creator: "0x8765...4321",
            participants: "1.8K",
            status: "upcoming",
            whitelist: true,
            socialLinks: {
                website: "#",
                twitter: "#",
                discord: "#"
            }
        }
    ];

    const handleMint = (launchId) => {
        console.log(`Minting from launch ${launchId}`);
        // Implement minting logic here
    };

    const handleWhitelist = (launchId) => {
        console.log(`Joining whitelist for launch ${launchId}`);
        // Implement whitelist logic here
    };

    return (
        <div className={Style.launchpad}>
            <div className={Style.launchpad_container}>
                {/* Header Section */}
                <div className={Style.header}>
                    <h1>NFT Launchpad</h1>
                    <div className={Style.tab_buttons}>
                        <button
                            className={`${Style.tab_button} ${activeTab === 'live' ? Style.active : ''}`}
                            onClick={() => setActiveTab('live')}
                        >
                            Live Launches
                        </button>
                        <button
                            className={`${Style.tab_button} ${activeTab === 'upcoming' ? Style.active : ''}`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Upcoming
                        </button>
                        <button
                            className={`${Style.tab_button} ${activeTab === 'ended' ? Style.active : ''}`}
                            onClick={() => setActiveTab('ended')}
                        >
                            Ended
                        </button>
                    </div>
                </div>

                {/* Launches Grid */}
                <div className={Style.launches_grid}>
                    {launches.map((launch) => (
                        <div key={launch.id} className={Style.launch_card}>
                            <div className={Style.launch_image}>
                                <Image
                                    src={launch.image}
                                    alt={launch.name}
                                    width={400}
                                    height={300}
                                    className={Style.nft_image}
                                />
                                <div className={Style.launch_status}>
                                    <MdRocket />
                                    <span>{launch.status === 'live' ? 'Live Now' : 'Upcoming'}</span>
                                </div>
                            </div>

                            <div className={Style.launch_content}>
                                <div className={Style.launch_header}>
                                    <h3>{launch.name}</h3>
                                    {launch.whitelist && (
                                        <div className={Style.whitelist_badge}>
                                            Whitelist Open
                                        </div>
                                    )}
                                </div>

                                <p className={Style.launch_description}>
                                    {launch.description}
                                </p>

                                <div className={Style.launch_stats}>
                                    <div className={Style.stat_item}>
                                        <MdTimer className={Style.stat_icon} />
                                        <div className={Style.stat_info}>
                                            <span className={Style.stat_label}>Time</span>
                                            <span className={Style.stat_value}>{launch.startTime}</span>
                                        </div>
                                    </div>
                                    <div className={Style.stat_item}>
                                        <MdPeople className={Style.stat_icon} />
                                        <div className={Style.stat_info}>
                                            <span className={Style.stat_label}>Participants</span>
                                            <span className={Style.stat_value}>{launch.participants}</span>
                                        </div>
                                    </div>
                                    <div className={Style.stat_item}>
                                        <MdBarChart className={Style.stat_icon} />
                                        <div className={Style.stat_info}>
                                            <span className={Style.stat_label}>Progress</span>
                                            <span className={Style.stat_value}>{launch.minted}/{launch.totalSupply}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={Style.price_info}>
                                    <div className={Style.price}>
                                        <span>Mint Price</span>
                                        <div className={Style.eth_amount}>
                                            <FaEthereum />
                                            <span>{launch.price} ETH</span>
                                        </div>
                                    </div>
                                    <div className={Style.creator}>
                                        <span>Creator</span>
                                        <span className={Style.creator_address}>{launch.creator}</span>
                                    </div>
                                </div>

                                <div className={Style.progress_bar_container}>
                                    <div 
                                        className={Style.progress_bar}
                                        style={{ 
                                            width: `${(parseInt(launch.minted.replace(/,/g, '')) / 
                                                    parseInt(launch.totalSupply.replace(/,/g, ''))) * 100}%` 
                                        }}
                                    ></div>
                                </div>

                                <div className={Style.launch_actions}>
                                    {launch.status === 'live' ? (
                                        <button
                                            className={Style.mint_button}
                                            onClick={() => handleMint(launch.id)}
                                            disabled={!currentAccount}
                                        >
                                            <MdRocket />
                                            Mint Now
                                        </button>
                                    ) : (
                                        <button
                                            className={Style.whitelist_button}
                                            onClick={() => handleWhitelist(launch.id)}
                                            disabled={!currentAccount}
                                        >
                                            Join Whitelist
                                        </button>
                                    )}
                                </div>

                                <div className={Style.social_links}>
                                    <a href={launch.socialLinks.website} target="_blank" rel="noopener noreferrer">Website</a>
                                    <a href={launch.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                                    <a href={launch.socialLinks.discord} target="_blank" rel="noopener noreferrer">Discord</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Launchpad; 
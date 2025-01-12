"use client";
import { useState, useContext } from 'react';
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';
import Style from './BundleSales.module.css';
import { MdAddCircle, MdShoppingCart, MdInfo } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';
import Image from 'next/image';

const BundleSales = () => {
    const { currentAccount } = useContext(NFTMarketplaceContext);
    const [activeTab, setActiveTab] = useState('available');

    // Sample data - replace with actual data from smart contract
    const bundles = [
        {
            id: 1,
            name: "Art Collection Bundle",
            description: "A curated collection of premium digital artworks",
            price: "5.5",
            items: [
                { id: 1, name: "Abstract Dreams #1", image: "/nft1.jpg" },
                { id: 2, name: "Abstract Dreams #2", image: "/nft2.jpg" },
                { id: 3, name: "Abstract Dreams #3", image: "/nft3.jpg" }
            ],
            savings: "25",
            creator: "0x1234...5678"
        },
        {
            id: 2,
            name: "Gaming Assets Pack",
            description: "Essential gaming items and characters",
            price: "3.2",
            items: [
                { id: 4, name: "Legendary Sword", image: "/nft4.jpg" },
                { id: 5, name: "Hero Character", image: "/nft5.jpg" },
                { id: 6, name: "Magic Spell", image: "/nft6.jpg" }
            ],
            savings: "20",
            creator: "0x8765...4321"
        }
    ];

    const handleBundlePurchase = (bundleId) => {
        console.log(`Purchasing bundle ${bundleId}`);
        // Implement bundle purchase logic here
    };

    return (
        <div className={Style.bundle_sales}>
            <div className={Style.bundle_container}>
                {/* Header Section */}
                <div className={Style.header}>
                    <h1>NFT Bundles</h1>
                    <div className={Style.tab_buttons}>
                        <button
                            className={`${Style.tab_button} ${activeTab === 'available' ? Style.active : ''}`}
                            onClick={() => setActiveTab('available')}
                        >
                            Available Bundles
                        </button>
                        <button
                            className={`${Style.tab_button} ${activeTab === 'my-bundles' ? Style.active : ''}`}
                            onClick={() => setActiveTab('my-bundles')}
                        >
                            My Bundles
                        </button>
                        <button
                            className={`${Style.tab_button} ${activeTab === 'create' ? Style.active : ''}`}
                            onClick={() => setActiveTab('create')}
                        >
                            Create Bundle
                        </button>
                    </div>
                </div>

                {/* Bundles Grid */}
                <div className={Style.bundles_grid}>
                    {bundles.map((bundle) => (
                        <div key={bundle.id} className={Style.bundle_card}>
                            <div className={Style.bundle_header}>
                                <h3>{bundle.name}</h3>
                                <div className={Style.savings_badge}>
                                    {bundle.savings}% OFF
                                </div>
                            </div>

                            <p className={Style.bundle_description}>
                                {bundle.description}
                            </p>

                            {/* Bundle Items */}
                            <div className={Style.bundle_items}>
                                {bundle.items.map((item) => (
                                    <div key={item.id} className={Style.bundle_item}>
                                        <div className={Style.item_image}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className={Style.nft_image}
                                            />
                                        </div>
                                        <span className={Style.item_name}>{item.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={Style.bundle_info}>
                                <div className={Style.price_info}>
                                    <span>Bundle Price</span>
                                    <div className={Style.price}>
                                        <FaEthereum />
                                        <span>{bundle.price} ETH</span>
                                    </div>
                                </div>

                                <div className={Style.creator_info}>
                                    <span>Creator</span>
                                    <span className={Style.creator_address}>{bundle.creator}</span>
                                </div>
                            </div>

                            <div className={Style.bundle_actions}>
                                <button
                                    className={Style.info_button}
                                    onClick={() => {}}
                                >
                                    <MdInfo />
                                    Details
                                </button>
                                <button
                                    className={Style.purchase_button}
                                    onClick={() => handleBundlePurchase(bundle.id)}
                                    disabled={!currentAccount}
                                >
                                    <MdShoppingCart />
                                    Purchase Bundle
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Bundle Button */}
                <button className={Style.create_bundle_button}>
                    <MdAddCircle />
                    Create New Bundle
                </button>
            </div>
        </div>
    );
};

export default BundleSales; 
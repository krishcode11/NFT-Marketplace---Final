"use client";
import { useState, useContext, useEffect } from 'react';
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';
import Style from './Analytics.module.css';
import { MdTrendingUp, MdShowChart, MdPieChart, MdTimeline } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';

const Analytics = () => {
    const { fetchMarketItems } = useContext(NFTMarketplaceContext);
    const [timeFilter, setTimeFilter] = useState('24h');
    const [analyticsData, setAnalyticsData] = useState({
        totalVolume: "1,234.56",
        percentChange: "+12.34",
        floorPrice: "0.85",
        listings: "1,432",
        totalSales: "892",
        averagePrice: "1.2"
    });

    const timeFilters = ['24h', '7d', '30d', 'All'];

    const topCollections = [
        { name: 'Bored Ape Yacht Club', volume: '234.5', change: '+12.3' },
        { name: 'CryptoPunks', volume: '187.2', change: '-5.8' },
        { name: 'Azuki', volume: '156.7', change: '+8.4' },
        { name: 'Doodles', volume: '98.4', change: '+15.2' },
    ];

    return (
        <div className={Style.analytics}>
            <div className={Style.analytics_container}>
                {/* Header Section */}
                <div className={Style.header}>
                    <h1>Market Analytics</h1>
                    <div className={Style.time_filters}>
                        {timeFilters.map((filter) => (
                            <button
                                key={filter}
                                className={`${Style.filter_button} ${timeFilter === filter ? Style.active : ''}`}
                                onClick={() => setTimeFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className={Style.stats_grid}>
                    <div className={Style.stat_card}>
                        <div className={Style.stat_header}>
                            <span>Total Volume</span>
                            <MdShowChart className={Style.stat_icon} />
                        </div>
                        <div className={Style.stat_value}>
                            <FaEthereum />
                            <span>{analyticsData.totalVolume}</span>
                        </div>
                        <div className={`${Style.stat_change} ${analyticsData.percentChange.startsWith('+') ? Style.positive : Style.negative}`}>
                            {analyticsData.percentChange}%
                        </div>
                    </div>

                    <div className={Style.stat_card}>
                        <div className={Style.stat_header}>
                            <span>Floor Price</span>
                            <MdTrendingUp className={Style.stat_icon} />
                        </div>
                        <div className={Style.stat_value}>
                            <FaEthereum />
                            <span>{analyticsData.floorPrice}</span>
                        </div>
                        <div className={Style.stat_label}>Current Floor</div>
                    </div>

                    <div className={Style.stat_card}>
                        <div className={Style.stat_header}>
                            <span>Active Listings</span>
                            <MdPieChart className={Style.stat_icon} />
                        </div>
                        <div className={Style.stat_value}>
                            <span>{analyticsData.listings}</span>
                        </div>
                        <div className={Style.stat_label}>Total Items</div>
                    </div>

                    <div className={Style.stat_card}>
                        <div className={Style.stat_header}>
                            <span>Total Sales</span>
                            <MdTimeline className={Style.stat_icon} />
                        </div>
                        <div className={Style.stat_value}>
                            <span>{analyticsData.totalSales}</span>
                        </div>
                        <div className={Style.stat_label}>Completed Sales</div>
                    </div>
                </div>

                {/* Top Collections */}
                <div className={Style.collections_section}>
                    <h2>Top Collections</h2>
                    <div className={Style.collections_grid}>
                        {topCollections.map((collection, index) => (
                            <div key={index} className={Style.collection_card}>
                                <div className={Style.collection_rank}>{index + 1}</div>
                                <div className={Style.collection_info}>
                                    <h3>{collection.name}</h3>
                                    <div className={Style.collection_stats}>
                                        <div className={Style.collection_volume}>
                                            <FaEthereum />
                                            <span>{collection.volume}</span>
                                        </div>
                                        <div className={`${Style.collection_change} ${collection.change.startsWith('+') ? Style.positive : Style.negative}`}>
                                            {collection.change}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics; 
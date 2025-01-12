"use client";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { sepolia, mainnet } from 'wagmi/chains';
import { NFTMarketplaceProvider } from '../Context/NFTMarketplaceContext';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "bb2f72dac253a43be7b9e3843d6c58cb";

// 2. Create wagmiConfig
const metadata = {
  name: 'NFT Marketplace',
  description: 'A modern NFT marketplace for digital collectibles',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, sepolia];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Initialize modal
if (typeof window !== 'undefined') {
  createWeb3Modal({ wagmiConfig, projectId, chains });
}

export function Providers({ children }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <NFTMarketplaceProvider>
        {children}
      </NFTMarketplaceProvider>
    </WagmiConfig>
  );
} 
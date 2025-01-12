'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { NFTMarketplaceProvider } from '../Context/NFTMarketplaceContext';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "bb2f72dac253a43be7b9e3843d6c58cb";

// 2. Create wagmiConfig
const metadata = {
  name: "NFT Marketplace",
  description: "A modern NFT marketplace for digital collectibles",
  url: "https://nftmarketplace.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

const chains = [sepolia];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableCoinbase: true,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent-color': '#ff7eb3',
    '--w3m-background-color': '#1a1b1f',
    '--w3m-text-color': '#ffffff',
    '--w3m-border-radius': '8px',
  },
  defaultChain: sepolia,
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase
    '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f', // Rainbow
  ],
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase
    '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f', // Rainbow
    'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18', // Zerion
    'cf21952a9bc8108bf13b12c92443751e2cc388d27008be4201b92bbc6d83dd46', // Phantom
    '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662', // BitKeep
    '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927', // Ledger
  ],
  excludeWalletIds: [],
  mobileWallets: [
    {
      id: 'trust',
      name: 'Trust Wallet',
      links: {
        native: 'trust://',
        universal: 'https://link.trustwallet.com'
      }
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      links: {
        native: 'metamask://',
        universal: 'https://metamask.app.link'
      }
    }
  ],
  desktopWallets: [
    {
      id: 'metamask',
      name: 'MetaMask',
      links: {
        native: 'metamask://',
        universal: 'https://metamask.io'
      }
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      links: {
        native: 'cbwallet://',
        universal: 'https://www.coinbase.com/wallet'
      }
    }
  ]
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen bg-[#1a1b1f]`}>
        <WagmiConfig config={wagmiConfig}>
          <NFTMarketplaceProvider>
            {children}
          </NFTMarketplaceProvider>
        </WagmiConfig>
      </body> 
    </html>
  );
}

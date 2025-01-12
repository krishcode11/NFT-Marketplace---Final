"use client";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';
import { useNFTMarketplace } from '../../Context/NFTMarketplaceContext';
import Style from './Wallet.module.css';

const Wallet = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);
  const { connectWallet } = useNFTMarketplace();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = async () => {
    if (isConnected) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      try {
        await open();
        await connectWallet();
      } catch (error) {
        console.log("Error connecting wallet:", error);
      }
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.log("Error disconnecting:", error);
    }
  };

  return (
    <div className={Style.walletWrapper}>
      <button 
        onClick={handleConnect}
        className={Style.walletButton}
      >
        {isConnected ? (
          <>
            <img 
              src="/metamask.png" 
              alt="Wallet" 
              className={Style.walletIcon}
            />
            <span>{formatAddress(address)}</span>
          </>
        ) : (
          <>
            <span>Connect Wallet</span>
          </>
        )}
      </button>

      {isDropdownOpen && isConnected && (
        <div className={Style.dropdown}>
          <div className={Style.dropdownHeader}>
            <span>Connected with MetaMask</span>
          </div>
          <div className={Style.addressBox}>
            <span>{formatAddress(address)}</span>
            <div className={Style.addressActions}>
              <button onClick={() => navigator.clipboard.writeText(address)}>
                Copy Address
              </button>
              <a 
                href={`https://sepolia.etherscan.io/address/${address}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View on Etherscan
              </a>
            </div>
          </div>
          <button 
            onClick={handleDisconnect}
            className={Style.disconnectButton}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default Wallet; 
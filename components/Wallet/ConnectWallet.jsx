"use client";
import { useContext } from "react";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Style from "./ConnectWallet.module.css";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { MdAccountBalanceWallet, MdOutlineSecurity } from "react-icons/md";
import { SiBlockchaindotcom } from "react-icons/si";
import Image from "next/image";

const ConnectWallet = () => {
  const { connectWallet, currentAccount } = useContext(NFTMarketplaceContext);

  const walletMenu = [
    {
      title: "MetaMask",
      icon: "/images/wallet/metamask.png",
      description: "Connect using browser wallet"
    },
    {
      title: "Coinbase",
      icon: "/images/wallet/coinbase.png",
      description: "Connect using Coinbase wallet"
    },
    {
      title: "WalletConnect",
      icon: "/images/wallet/walletconnect.png",
      description: "Connect using mobile wallet"
    }
  ];

  const features = [
    {
      icon: <MdAccountBalanceWallet />,
      title: "Easy Setup",
      description: "Connect your crypto wallet in just a few clicks"
    },
    {
      icon: <MdOutlineSecurity />,
      title: "Secure Connection",
      description: "Your keys, your crypto. We never store your private keys"
    },
    {
      icon: <SiBlockchaindotcom />,
      title: "Blockchain Support",
      description: "Trade NFTs on the Ethereum blockchain"
    }
  ];

  return (
    <div className={Style.wallet}>
      <div className={Style.wallet_box}>
        <div className={Style.wallet_box_header}>
          <h1>Connect Your Wallet</h1>
          <p>Choose how you want to connect. There are several wallet providers.</p>
        </div>

        <div className={Style.wallet_box_providers}>
          {walletMenu.map((item, index) => (
            <button key={index} className={Style.wallet_box_provider} onClick={connectWallet}>
              <div className={Style.wallet_box_provider_img}>
                <Image src={item.icon} alt={item.title} width={50} height={50} />
              </div>
              <div className={Style.wallet_box_provider_info}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className={Style.wallet_box_features}>
          {features.map((item, index) => (
            <div key={index} className={Style.wallet_box_feature}>
              <div className={Style.wallet_box_feature_icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={Style.wallet_box_info}>
          <div className={Style.wallet_box_info_icon}>
            <FaEthereum />
          </div>
          <div className={Style.wallet_box_info_content}>
            <h3>Why Connect Wallet?</h3>
            <p>
              Connecting your wallet is like logging into Web3. It lets you buy,
              sell, and trade NFTs on our marketplace using cryptocurrency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet; 
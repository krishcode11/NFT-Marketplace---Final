"use client";
import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";
import Web3Modal from "web3modal";
import axios from "axios";
import { create as ipfsClient } from "ipfs-http-client";
import Router from "next/router";
import { useRouter } from "next/navigation";

const client = ipfsClient("https://ipfs.infura.io:5001/api/v0");


//Fetching Smart Contract
const fetchContract = (signerorProvider) => new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerorProvider);

// ---connect with smart contact
const connectingWithSmartContract = async()=> {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Error connecting with smart contract:", error);
    }
};


export const NFTMarketplaceContext = createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect, and sell NFTs";


    //--USE STATE
    const [currentAccount, setCurrentAccount] = useState("");
    const [web3Modal, setWeb3Modal] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) {
                console.log("Install MetaMask");
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log("Account connected:", accounts[0]);
            } else {
                console.log("No account found");
            }
        } catch (error) {
            console.log("Error checking wallet connection:", error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                console.log("Install MetaMask");
                return;
            }

            setIsLoading(true);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
            console.log("Account connected:", accounts[0]);
            router.push("/");
        } catch (error) {
            console.log("Error connecting wallet:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const disconnectWallet = async () => {
        try {
            setCurrentAccount("");
            router.push("/");
        } catch (error) {
            console.log("Error disconnecting wallet:", error);
        }
    };

    const uploadToIPFS = async(file)=> { 
        try {
            const result = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${result.path}`;
            console.log("Uploaded to IPFS:", url);
            return url;
        } catch (error) {
            console.log("Error uploading to IPFS:", error);
        }
    };

    const createNFT = async(name, price, image, description, router) => {
        if(!name || !description || !price || !image) {
            console.log("Missing required fields");
            return;
        }

        const data = JSON.stringify({ name, description, image });

        try {
            const result = await client.add(data);
            const url = `https://ipfs.infura.io/ipfs/${result.path}`;
            await createSale(url, price);
            router.push('/');
        } catch (error) {
            if (error.code === 4001) {
                console.log("Transaction rejected by user");
            } else {
                console.log("Error creating NFT:", error);
            }
            throw error;
        }
    };

    const createSale = async(url, formInputPrice, isReselling, id) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.parseUnits(formInputPrice, "ether");
            const listingPrice = await contract.getListingPrice();

            const transaction = !isReselling 
                ? await contract.createToken(url, price, { value: listingPrice.toString() })
                : await contract.resellToken(id, price, { value: listingPrice.toString() });

            await transaction.wait();
            console.log("NFT listed successfully");
        } catch (error) {
            console.log("Error creating sale:", error);
        }
    };

    const fetchNFTs = async () => {
        try {
            const provider = new ethers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItems();

            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const { data: { image, name, description } } = await axios.get(tokenURI);
                    const price = ethers.formatUnits(unformattedPrice.toString(), "ether");

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    };
                })
            );
            return items;
        } catch (error) {
            console.log("Error fetching NFTs:", error);
        }
    };

    const fetchMyNFTsOrListedNFTs = async(type) => {
        try {
            const contract = await connectingWithSmartContract();
            
            const data = type === "fetchItemsListed"
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNFTs();

            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const { data: { image, name, description } } = await axios.get(tokenURI);
                    const price = ethers.formatUnits(unformattedPrice.toString(), "ether");

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    };
                })
            );
            return items;
        } catch (error) {
            console.log("Error fetching NFTs:", error);
        }
    };

    const buyNFT = async(nft) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.parseUnits(nft.price.toString(), "ether");
            
            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price
            });
            
            await transaction.wait();
            console.log("NFT bought successfully");
            Router.push('/my-nfts');
        } catch (error) {
            if (error.code === 4001) {
                console.log("Transaction rejected by user");
            } else if (error.code === -32603) {
                console.log("Insufficient funds");
            } else {
                console.log("Error buying NFT:", error);
            }
            throw error;
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
        if (!web3Modal) {
            const web3Modal = new Web3Modal({
                network: "sepolia",
                cacheProvider: true,
                providerOptions: {}
            });
            setWeb3Modal(web3Modal);

            const connectToProvider = async () => {
                const connection = await web3Modal.connect();
                const ethersProvider = new ethers.BrowserProvider(connection);
                const signer = await ethersProvider.getSigner();
                setProvider(ethersProvider);
                setSigner(signer);
            };
            connectToProvider();
        }

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                } else {
                    setCurrentAccount("");
                }
            });

            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", () => {});
                window.ethereum.removeListener("chainChanged", () => {});
            }
        };
    }, []);

    return (
        <NFTMarketplaceContext.Provider 
            value={{ 
                titleData,
                currentAccount,
                connectWallet,
                disconnectWallet,
                checkIfWalletConnected,
                web3Modal,
                provider,
                signer,
                connectingWithSmartContract,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                isLoading
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    );
};

export const useNFTMarketplace = () => {
    const context = React.useContext(NFTMarketplaceContext);
    if (!context) {
        throw new Error("useNFTMarketplace must be used within a NFTMarketplaceProvider");
    }
    return context;
};




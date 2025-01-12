const { ethers } = require("hardhat");
const { parseEther, formatEther } = require("ethers");

const main = async () => {
    try {
        const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        const nftMarketplace = await NFTMarketplace.deploy();
        await nftMarketplace.waitForDeployment();
        
        const address = await nftMarketplace.getAddress();
        console.log("Contract deployed to:", address);
    } catch (error) {
        console.error("❌ Error deploying contract:", error);
    }
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 
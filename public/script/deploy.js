const { ethers } = require("hardhat");
const { parseEther, formatEther } = require("ethers");

async function main() {
    try {
        // Get the contract deployer
        const [deployer] = await ethers.getSigners();
        console.log("Deploying contracts with the account:", deployer.address);

        // Display deployer balance
        const balance = await ethers.provider.getBalance(deployer);
        console.log("Account balance:", formatEther(balance));

        // Deploy NFTMarketplace
        const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        console.log("Deploying NFTMarketplace...");
        const nftMarketplace = await NFTMarketplace.deploy();

        // Wait for deployment
        await nftMarketplace.waitForDeployment();
        console.log("✅ NFTMarketplace deployed to:", await nftMarketplace.getAddress());

        // Get and display the listing price
        const listingPrice = await nftMarketplace.getListingPrice();
        console.log("Marketplace listing price:", formatEther(listingPrice), "ETH");

        console.log("\nContract Details:");
        console.log("----------------");
        console.log("Contract Address:", await nftMarketplace.getAddress());
        console.log("Owner Address:", deployer.address);

    } catch (error) {
        console.error("\n❌ Error deploying contract:", error.message);
        throw error;
    }
}

main()
    .then(() => {
        console.log("\n📝 Deployment completed successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 
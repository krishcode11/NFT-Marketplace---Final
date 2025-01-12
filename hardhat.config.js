require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    polygon_amoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/q3wQIjz5sxWIMZc_-1QUx__dtYMW-hMd",
      accounts: ["d6a032fd006de4c71633349303e65eaeb7141e02c820ca0ed4dcbf336b92367d" ],
    },
  },
};

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    artifacts: "./src/artifacts",  // Output artifacts inside src folder
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/abIqZuiDK8cpZxMlo69OrlSBZGNVuSjc", 
      accounts: ["39fb586c2e3df8900522289f69eb0030eedfd970da4b017492c10370224889ee"] 
    },
  },
};

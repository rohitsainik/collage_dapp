require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.ALCHEMY_API_URL,  // Replace with Alchemy or Infura URL
      accounts: [process.env.PRIVATE_KEY]  // Your wallet's private key (DO NOT SHARE!)
    },
  },
};

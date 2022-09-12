require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_PRIVATE_KEY = process.env.ALCHEMY_PRIVATE_KEY;
const METAMASK_PRIVATE = process.env.METAMASK_PRIVATE;
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_PRIVATE_KEY}/`,
      accounts: [`${METAMASK_PRIVATE}`],
    },
  },
};

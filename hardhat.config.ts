import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    networks: {
        sepolia: {
            url: process.env.SEPOLIA_RPC || "",
            accounts: [process.env.PRIVATE_KEY || ""],
            gasPrice: 20000000000, // 20 gwei
        },
        mainnet: {
            url: process.env.MAINNET_RPC || "",
            accounts: [process.env.PRIVATE_KEY || ""],
            gasPrice: 50000000000, // 50 gwei
        }
    }
};

export default config;
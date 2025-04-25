const { ethers } = require("hardhat");
const { FlashbotsBundleProvider } = require("@flashbots/ethers-provider-bundle");

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.MAINNET_RPC);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const flashbotsProvider = await FlashbotsBundleProvider.create(
        provider,
        wallet,
        "https://relay.flashbots.net"
    );

    const bundle = [
        {
            transaction: {
                to: wallet.address,
                value: 0,
                gasPrice: 0
            },
            signer: wallet
        }
    ];

    const simulation = await flashbotsProvider.simulate(bundle, "latest");
    console.log("Simulation success:", simulation.firstRevert === null);
}

main().catch(console.error);
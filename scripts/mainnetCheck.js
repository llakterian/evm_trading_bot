require("dotenv").config();
const { ethers } = require("ethers");

async function verify() {
    const provider = new ethers.JsonRpcProvider(process.env.MAINNET_RPC);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // 1. Verify connection
    console.log("Network:", (await provider.getNetwork()).name);

    // 2. Verify balance
    const balance = await provider.getBalance(wallet.address);
    console.log("Balance:", ethers.formatEther(balance), "ETH");

    // 3. Test small transaction
    const tx = await wallet.sendTransaction({
        to: wallet.address,
        value: 0
    });
    console.log("Test tx hash:", tx.hash);
    await tx.wait();
    console.log("Test tx confirmed");
}

verify().catch(console.error);
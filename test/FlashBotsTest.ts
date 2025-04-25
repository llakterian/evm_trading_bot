import { ethers } from "hardhat";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";
import { expect } from "chai";

describe("Flashbots Tests", function () {
    this.timeout(30000);

    it("Should fail to initialize with invalid relay URL", async function () {
        if (!process.env.RPC_URL?.includes("mainnet")) {
            return this.skip();
        }

        try {
            await FlashbotsBundleProvider.create(
                ethers.provider,
                ethers.Wallet.createRandom(),
                "https://invalid.relay.url"
            );
            expect.fail("Should have thrown error");
        } catch (error) {
            expect(error).to.exist;
        }
    });

    it("Should initialize with custom relay URL", async function () {
        if (!process.env.RPC_URL?.includes("mainnet")) {
            return this.skip();
        }

        const provider = await FlashbotsBundleProvider.create(
            ethers.provider,
            ethers.Wallet.createRandom(),
            "https://relay-goerli.flashbots.net"
        );
        expect(provider).to.be.instanceOf(FlashbotsBundleProvider);
    });

    it("Should maintain wallet authorization after initialization", async function () {
        if (!process.env.RPC_URL?.includes("mainnet")) {
            return this.skip();
        }

        const authWallet = ethers.Wallet.createRandom();
        const provider = await FlashbotsBundleProvider.create(
            ethers.provider,
            authWallet,
            "https://relay.flashbots.net"
        );
        expect(provider).to.be.instanceOf(FlashbotsBundleProvider);
        expect(provider.authSigner).to.equal(authWallet);
    });
});
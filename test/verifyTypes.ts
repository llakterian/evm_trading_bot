import * as fs from 'fs';
import * as path from 'path';
import { ethers } from 'hardhat';

async function main() {
    console.log("Verifying contract and TypeScript interface consistency...");

    // Get the contract artifact which contains the ABI
    const Lock = await ethers.getContractFactory("Lock");
    const lockAbi = Lock.interface.format('json');

    // Read the TypeScript interface file
    const typesPath = path.join(__dirname, '../typechain-types/Lock.ts');
    const typesContent = fs.readFileSync(typesPath, 'utf8');

    // Check for events in contract
    const contractEvents = Lock.interface.events;

    // Simple checks for event presence in TypeScript file
    console.log("\nChecking events:");
    for (const eventKey in contractEvents) {
        const eventName = eventKey.split('(')[0];
        if (!typesContent.includes(`${eventName}(`)) {
            console.error(`❌ Event ${eventName} exists in contract but not in TypeScript interface`);
        } else {
            console.log(`✅ Event ${eventName} found in TypeScript interface`);
        }
    }

    // Check for functions in contract
    const contractFunctions = Lock.interface.functions;

    console.log("\nChecking functions:");
    for (const funcKey in contractFunctions) {
        const funcName = funcKey.split('(')[0];
        if (!typesContent.includes(`${funcName}(`)) {
            console.error(`❌ Function ${funcName} exists in contract but not in TypeScript interface`);
        } else {
            console.log(`✅ Function ${funcName} found in TypeScript interface`);
        }
    }

    console.log("\nVerification complete. If any discrepancies were found, run 'npx hardhat typechain' to regenerate types.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

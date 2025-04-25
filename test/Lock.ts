import { ethers } from "hardhat";
import { expect } from "chai";

describe("Basic Tests", function () {
  let Lock: any;
  let lock: any;
  let owner: any;

  before(async function () {
    [owner] = await ethers.getSigners();
    Lock = await ethers.getContractFactory("Lock");
    lock = await Lock.deploy();
  });

  it("Should deploy successfully", async function () {
    expect(await lock.someFunction()).to.equal(true);
  });

  it("Should return correct owner", async function () {
    expect(await lock.owner()).to.equal(owner.address);
  });
});
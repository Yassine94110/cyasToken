const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

const { expect } = require("chai");
const { ethers } = require("hardhat");


const recipientCount = 5;
const recipientAddresses = [];

for (let i = 0; i < recipientCount; i++) {
  const wallet = ethers.Wallet.createRandom();
  recipientAddresses.push(wallet.address);
}


describe("CyasInu", function () {
  let cyasInu;
  let owner;

  before(async function () {
    const CyasInu = await ethers.getContractFactory("CyasInu");
    cyasInu = await CyasInu.deploy();
    await cyasInu.deployed(recipientAddresses);

    [owner] = await ethers.getSigners();
  });

  it("verification du nom, le symbole et le nombre de décimales ", async function () {
    expect(await cyasInu.name()).to.equal("CyasInu");
    expect(await cyasInu.symbol()).to.equal("CINU");
    expect(await cyasInu.decimals()).to.equal(18);
  });

  it("verification supply", async function () {
    const initialSupply = ethers.utils.parseUnits("1000", 18);
    expect(await cyasInu.totalSupply()).to.equal(initialSupply);

    const ownerBalance = await cyasInu.balanceOf(owner.address);
    expect(ownerBalance).to.equal(initialSupply);
  });

  it("test tranfer de token", async function () {
    const recipient = "0x1234567890123456789012345678901234567890";
    const amount = ethers.utils.parseUnits("100", 18);

    await cyasInu.transfer(recipient, amount);

    const ownerBalance = await cyasInu.balanceOf(owner.address);
    const recipientBalance = await cyasInu.balanceOf(recipient);

    expect(ownerBalance).to.equal(ethers.utils.parseUnits("900", 18));
    expect(recipientBalance).to.equal(amount);
  });

  it("verification distribution equitable", async function () {


    await cyasInu.airdrop(recipientAddresses);

    for (let i = 0; i < recipientCount; i++) {
      const balance = await cyasInu.balanceOf(recipientAddresses[i]);
      expect(balance).to.equal(200 * 10 ** 18);
    }
  });

});

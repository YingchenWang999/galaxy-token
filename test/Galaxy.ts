import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("Galaxy", function () {
  async function deployFixture() {
    const [initialHolder, recipient, spender] = await ethers.getSigners();
    const token = await ethers.deployContract("Galaxy", [initialHolder.address]);
    await token.waitForDeployment();

    return { token, initialHolder, recipient, spender };
  }

  it("sets the immutable token metadata", async function () {
    const { token } = await deployFixture();

    expect(await token.name()).to.equal("Galaxy");
    expect(await token.symbol()).to.equal("GXLY");
    expect(await token.decimals()).to.equal(8);
  });

  it("mints exactly 20 million tokens once to the initial holder", async function () {
    const { token, initialHolder } = await deployFixture();
    const expectedSupply = ethers.parseUnits("20000000", 8);

    expect(await token.MAX_SUPPLY()).to.equal(expectedSupply);
    expect(await token.totalSupply()).to.equal(expectedSupply);
    expect(await token.balanceOf(initialHolder.address)).to.equal(expectedSupply);
  });

  it("rejects deployment to the zero address", async function () {
    await expect(
      ethers.deployContract("Galaxy", [ethers.ZeroAddress]),
    ).to.be.revertedWithCustomError(
      await ethers.getContractFactory("Galaxy"),
      "ERC20InvalidReceiver",
    );
  });

  it("supports standard transfers", async function () {
    const { token, initialHolder, recipient } = await deployFixture();
    const amount = ethers.parseUnits("125.5", 8);

    await expect(token.transfer(recipient.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(initialHolder.address, recipient.address, amount);

    expect(await token.balanceOf(recipient.address)).to.equal(amount);
  });

  it("rejects transfers larger than the sender balance", async function () {
    const { token, recipient } = await deployFixture();
    const recipientToken = token.connect(recipient) as typeof token;

    await expect(
      recipientToken.transfer(ethers.ZeroAddress, 1n),
    ).to.be.revertedWithCustomError(token, "ERC20InvalidReceiver");

    await expect(
      recipientToken.transfer(await token.getAddress(), 1n),
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
  });

  it("lets holders burn tokens and permanently reduces supply", async function () {
    const { token, initialHolder } = await deployFixture();
    const amount = ethers.parseUnits("100", 8);
    const supplyBefore = await token.totalSupply();

    await expect(token.burn(amount))
      .to.emit(token, "Transfer")
      .withArgs(initialHolder.address, ethers.ZeroAddress, amount);

    expect(await token.totalSupply()).to.equal(supplyBefore - amount);
  });

  it("supports allowance-based transfers", async function () {
    const { token, initialHolder, recipient, spender } = await deployFixture();
    const amount = ethers.parseUnits("42", 8);

    await token.approve(spender.address, amount);
    const spenderToken = token.connect(spender) as typeof token;
    await spenderToken.transferFrom(
      initialHolder.address,
      recipient.address,
      amount,
    );

    expect(await token.balanceOf(recipient.address)).to.equal(amount);
  });

  it("lets approved spenders burn tokens and consumes the allowance", async function () {
    const { token, initialHolder, spender } = await deployFixture();
    const amount = ethers.parseUnits("25", 8);
    const spenderToken = token.connect(spender) as typeof token;

    await token.approve(spender.address, amount);
    await expect(spenderToken.burnFrom(initialHolder.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(initialHolder.address, ethers.ZeroAddress, amount);

    expect(
      await token.allowance(initialHolder.address, spender.address),
    ).to.equal(0n);
    expect(await token.totalSupply()).to.equal(
      (await token.MAX_SUPPLY()) - amount,
    );
  });

  it("exposes no owner, mint, pause, freeze, blacklist, or upgrade function", async function () {
    const { token } = await deployFixture();
    const forbiddenFunctions = [
      "owner",
      "mint",
      "pause",
      "freeze",
      "blacklist",
      "upgradeTo",
    ];
    const functionNames: string[] = [];
    token.interface.forEachFunction((fragment) => {
      functionNames.push(fragment.name);
    });

    for (const functionName of forbiddenFunctions) {
      expect(functionNames).not.to.include(functionName);
    }
  });
});

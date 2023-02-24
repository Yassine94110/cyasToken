async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await deployer.getBalance()).toString();

  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  // make sure to replace the "NessDoge" reference with your own ERC-20 name!
  const Token = await ethers.getContractFactory("CyasInu");
  const token = await Token.deploy(['0x3eb4f6ca08877cb96993c671b23aa1e24b322ca4', '0xB86555Fe98e4B9D832980A94b82E6cdaAdFC0e31', '0x9497673375B639730061b8fDf7F69932E9427ba4', '0xA3105f4212f22e7BaEf3ECdB10eaef384B7d9576', '0x94eB0D62976c29cc76B7E879bd86b08c38CF3B35']);

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
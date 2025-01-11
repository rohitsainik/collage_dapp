const { ethers } = require("hardhat");

async function main() {
  // Get the Contract Factory and Signers
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Compile and Deploy the contract
  const Contract = await ethers.getContractFactory("ImageLicense");
  const contract = await Contract.deploy();
  console.log("Contract deployed to:", contract.address);

  // Wait for contract deployment to complete
  await contract.waitForDeployment();
  
  // You can interact with the contract here if needed.
  // Example: uploading an image to the contract
  const ipfsHash = "QmSomeHash";  // Replace with a real IPFS hash
  const licenseDetails = "Sample License";

  console.log("Uploading image...");
  const tx = await contract.uploadImage(ipfsHash, licenseDetails);
  await tx.wait();
  console.log("Image uploaded successfully!");

  // Verify that the image has been stored correctly
  const [owner, details, timestamp] = await contract.getImageDetails(ipfsHash);
  console.log(`Image Details:`);
  console.log(`Owner: ${owner}`);
  console.log(`License: ${details}`);
  console.log(`Timestamp: ${timestamp}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
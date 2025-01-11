
import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import axios from 'axios'; // Pinata API interaction
import DocumentVerification from '../artifacts/contracts/ImageLicense.sol/ImageLicense.json';
import '../styles.css'; // Custom styles

const PINATA_API_KEY = "61be15ccb9bad629c592";
const PINATA_API_SECRET = "1ccab48e2124ca3565f2bbb45e2de66241c6079233ce73a887936861f24b0540";
const contractAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"; 

const Upload = () => {
  const [image, setImage] = useState(null);
  const [licenseDetails, setLicenseDetails] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageHash, setImageHash] = useState('');
  const [uploadedImageURL, setUploadedImageURL] = useState(''); // State for the uploaded image URL

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    alert("Wallet connected successfully!");
  };

  const uploadImage = async () => {
    if (!image || !licenseDetails) {
      alert("Please select an image and provide license details.");
      return;
    }
    setStatus("Uploading image to IPFS...");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", image);

      // Upload image to Pinata
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'pinata_api_key': PINATA_API_KEY,  // Use your Pinata API key
            'pinata_secret_api_key': PINATA_API_SECRET,  // Use your Pinata API secret
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const ipfsHash = response.data.IpfsHash;
      setImageHash(ipfsHash); // Store the IPFS hash to display

      // Construct the image URL using the IPFS hash
      const imageURL = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      setUploadedImageURL(imageURL); // Set the uploaded image URL

      // Initialize Ethereum provider and contract interaction
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, DocumentVerification.abi, signer);

      setStatus("Uploading image metadata to the blockchain...");

      // Send image metadata (IPFS hash + license details) to the blockchain
      const tx = await contract.uploadImage(ipfsHash, licenseDetails);
      console.log("Transaction sent:", tx);
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);

      setStatus("Image uploaded and licensed successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus(`Failed to upload image: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Upload and License Your Image</h2>
    

      {/* File input for image upload */}
      <div className="file-input-wrapper">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input"
          disabled={loading}
        />
      </div>

      {/* Text area for license details */}
      <textarea
        placeholder="Enter license details (e.g., usage rights, royalty)"
        value={licenseDetails}
        onChange={(e) => setLicenseDetails(e.target.value)}
        className="text-input"
        disabled={loading}
      />

      {/* Upload button */}
      <button
        onClick={uploadImage}
        className="btn upload-btn"
        disabled={loading || !image || !licenseDetails}
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {/* Display status messages */}
      {status && <p className="status">{status}</p>}

      {/* Display the image's IPFS hash */}
      {imageHash && (
        <div className="hash-display">
          <p><strong>Image IPFS Hash:</strong> {imageHash}</p>
        </div>
      )}

      {/* Display the uploaded image */}
      {uploadedImageURL && (
        <div className="image-display">
          <h3>Uploaded Image:</h3>
          <img src={uploadedImageURL} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '400px' }} />
        </div>
      )}
    </div>
  );
};

export default Upload;
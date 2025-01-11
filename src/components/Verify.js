import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import DocumentVerification from '../artifacts/contracts/ImageLicense.sol/ImageLicense.json';
import '../styles.css';

const contractAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";  // Update with your contract address

const Verify = () => {
  const [imageHash, setImageHash] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [licenseDetails, setLicenseDetails] = useState('');

  const verifyImage = async () => {
    if (!imageHash) {
      return alert("Please enter the image hash.");
    }
  
    setStatus("Verifying the image...");
    setLoading(true);
  
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, DocumentVerification.abi, provider);
  
      // Get image details from the contract
      const imageData = await contract.getImageDetails(imageHash);
  
      // Log the image data to see the exact result returned from the contract
      console.log("Image Data:", imageData);
  
      // Handle the case where no data is returned or the result is empty
      if (!imageData || imageData[0] === '0x') {
        throw new Error("No data found for this image hash.");
      }
  
      // Destructure the returned data (owner, license details, and timestamp)
      const [owner, details, timestamp] = imageData;
  
      // Check for any missing or invalid data
      if (!owner || !details || !timestamp) {
        throw new Error("Invalid data returned from contract.");
      }
  
      // Set the license details
      setLicenseDetails(`Owner: ${owner}, License: ${details}, Timestamp: ${timestamp}`);
      setStatus("Image details fetched successfully!");
  
    } catch (error) {
      console.error("Verification failed:", error);
      setStatus(`Failed to fetch image ${imageHash} details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Verify Image License</h2>
      
      {/* Input field for image hash */}
      <input
        type="text"
        placeholder="Enter image IPFS hash"
        value={imageHash}
        onChange={(e) => setImageHash(e.target.value)}
        className="text-input"
        disabled={loading}
      />
      
      {/* Verify button */}
      <button
        onClick={verifyImage}
        className="btn verify-btn"
        disabled={loading || !imageHash}
      >
        {loading ? "Verifying..." : "Verify License"}
      </button>

      {/* Status message */}
      {status && <p className="status">{status}</p>}

      {/* Display license details */}
      {licenseDetails && (
        <div className="license-details">
          <p>{licenseDetails}</p>
        </div>
      )}
    </div>
  );
};

export default Verify;
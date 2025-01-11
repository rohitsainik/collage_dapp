import React, { useState } from 'react';
import axios from 'axios';

const LicenseCheck = () => {
  const [ipfsHash, setIpfsHash] = useState('');
  const [licenseDetails, setLicenseDetails] = useState('');
  const [status, setStatus] = useState('');

  const checkLicense = async () => {
    if (!ipfsHash) {
      alert("Please enter an IPFS hash!");
      return;
    }

    setStatus("Fetching license details...");

    try {
      // Call your smart contract or backend API to get the license details using IPFS hash
      // For simplicity, let's assume we call an API or contract here
      const response = await axios.post('https://your-backend-or-smart-contract-url', {
        ipfsHash,
      });

      // For example purposes, assuming the response has a license field
      const data = response.data; // Change this according to your actual response structure
      setLicenseDetails(`Owner: ${data.owner}, License: ${data.licenseDetails}`);
      setStatus("License details fetched successfully!");
    } catch (error) {
      setStatus("Error fetching license details: " + error.message);
    }
  };

  return (
    <div className="license-check-page">
      <h2>Check License</h2>
      <input
        type="text"
        placeholder="Enter image IPFS hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
      />
      <button onClick={checkLicense}>Check License</button>

      <p>{status}</p>
      {licenseDetails && <p><strong>License Details:</strong> {licenseDetails}</p>}
    </div>
  );
};

export default LicenseCheck;
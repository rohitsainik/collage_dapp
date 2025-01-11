import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import DocumentVerification from '../artifacts/contracts/ImageLicense.sol/ImageLicense.json';

const contractAddress = '0xYourContractAddressHere'; // Replace with your contract address

const Home = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      setWalletAddress(address);
      setIsWalletConnected(true);
      fetchUploadedImages(address); // Fetch images when wallet is connected
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  // Function to fetch all images uploaded by the connected wallet
  const fetchUploadedImages = async (address) => {
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, DocumentVerification.abi, provider);
    
    // Assuming there's a method to fetch images uploaded by a particular address
    const images = await contract.getImagesByAddress(address);  // Adjust this based on your contract
    setUploadedImages(images);
  };

  return (
    <div className="home-page">
      <h2>Home Page</h2>

      {/* Button to connect wallet */}
      {!isWalletConnected ? (
        <button onClick={() => navigate('/upload')} className="btn connect-wallet-btn">Upload Image</button>
      ) : (
        <p>Connected: {walletAddress}</p>
      )}

      {/* Button to navigate to Verify License page */}
      <button onClick={() => navigate('/verify-license')} className="btn">Verify License</button>

      <h3>Uploaded Images</h3>
      {uploadedImages.length > 0 ? (
        <div>
          {uploadedImages.map((image, index) => (
            <div key={index} className="uploaded-image">
              <img src={`https://gateway.pinata.cloud/ipfs/${image.ipfsHash}`} alt="Uploaded" />
              <p>License: {image.licenseDetails}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </div>
  );
};

export default Home;
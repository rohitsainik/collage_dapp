import React, { useState } from 'react';

const NavBar = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Function to connect wallet (MetaMask)
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      // Request account access if necessary
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      setWalletAddress(address); // Set the wallet address
      setIsWalletConnected(true); // Set wallet connection state
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo or brand */}
        <h1 className="navbar-brand">College Dapp</h1>

        {/* Connect wallet button or show address */}
        <div className="wallet-section">
          {!isWalletConnected ? (
            <button onClick={connectWallet} className="btn connect-wallet-btn">
              Connect Wallet
            </button>
          ) : (
            <p className="wallet-address">
              <strong>Wallet Address:</strong> {walletAddress}
            </p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
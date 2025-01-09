import React, { useState } from 'react';
import { ethers } from 'ethers';
import DocumentVerification from './DocumentVerification.json';

const contractAddress = "<YOUR_SMART_CONTRACT_ADDRESS>";

const Verify = () => {
  const [hash, setHash] = useState('');

  const verifyDocument = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, DocumentVerification.abi, signer);

    const verified = await contract.verifyDocument("<STUDENT_ADDRESS>", hash);
    alert(verified ? "Document Verified!" : "Verification Failed!");
  };

  return (
    <div>
      <input type="text" placeholder="Enter Document Hash" onChange={(e) => setHash(e.target.value)} />
      <button onClick={verifyDocument}>Verify Document</button>
    </div>
  );
};

export default Verify;
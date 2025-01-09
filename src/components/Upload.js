import React, { useState } from 'react';
import { ethers } from 'ethers';
import DocumentVerification from './DocumentVerification.json';

const contractAddress = "<YOUR_SMART_CONTRACT_ADDRESS>";

const Upload = () => {
  const [file, setFile] = useState(null);

  const uploadDocument = async () => {
    if (!file) return alert("Select a file!");
    const hashBuffer = await crypto.subtle.digest('SHA-256', file);
    const documentHash = ethers.utils.hexlify(new Uint8Array(hashBuffer));

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, DocumentVerification.abi, signer);

    await contract.uploadDocument(documentHash);
    alert("Document uploaded successfully!");
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadDocument}>Upload</button>
    </div>
  );
};

export default Upload;
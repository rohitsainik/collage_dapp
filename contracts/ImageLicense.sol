// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ImageLicense {
    struct Image {
        address owner;
        string licenseDetails;
        uint256 timestamp;
    }
    mapping(string => Image) public images;

    event ImageUploaded(address indexed owner, string ipfsHash, string licenseDetails, uint256 timestamp);

    function uploadImage(string memory _ipfsHash, string memory _licenseDetails) public {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty.");
        require(bytes(_licenseDetails).length > 0, "License details cannot be empty.");

        images[_ipfsHash] = Image({
            owner: msg.sender,
            licenseDetails: _licenseDetails,
            timestamp: block.timestamp
        });

        emit ImageUploaded(msg.sender, _ipfsHash, _licenseDetails, block.timestamp);
    }

    function getImageDetails(string memory _ipfsHash) public view returns (address owner, string memory licenseDetails, uint256 timestamp) {
        Image memory img = images[_ipfsHash];
        require(img.timestamp != 0, "Image not found.");

        return (img.owner, img.licenseDetails, img.timestamp);
    }
}
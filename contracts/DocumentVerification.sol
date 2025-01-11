// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Document {
        address uploader;
        bytes32 documentHash;
        uint256 timestamp;
        bool verified;
    }

    mapping(address => Document[]) public documents;

    event DocumentUploaded(address uploader, bytes32 documentHash);
    event DocumentVerified(address verifier, address uploader, bytes32 documentHash);

    function uploadDocument(bytes32 _documentHash) public {
        documents[msg.sender].push(Document(msg.sender, _documentHash, block.timestamp, false));
        emit DocumentUploaded(msg.sender, _documentHash);
    }

    function verifyDocument(address _uploader, bytes32 _documentHash) public {
        Document[] storage userDocs = documents[_uploader];
        for (uint256 i = 0; i < userDocs.length; i++) {
            if (userDocs[i].documentHash == _documentHash && !userDocs[i].verified) {
                userDocs[i].verified = true;
                emit DocumentVerified(msg.sender, _uploader, _documentHash);
            }
        }
    }
}
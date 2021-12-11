//SPDX-License-Identifier: MIT

pragma solidity =0.8.10;

contract TokenDecoder {
    struct Runeword {
        uint256 token;
        uint16 item;
        uint8 _type;
        uint8 attributeCount;
        uint16[8] attributeTypes;
        uint16[8] attributeValues;
    }

    function decodeRuneword(uint256 token) public pure returns (Runeword memory runeword) {
        // Your solution here!
    }
}

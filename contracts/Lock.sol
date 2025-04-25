// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lock is Ownable {
    bool public someState;
    uint256 public unlockTime;
    
    event ValueChanged(address indexed changer, bool newValue);
    event Withdrawn(address indexed recipient, uint256 amount);

    constructor() Ownable() {
        someState = true;
        unlockTime = block.timestamp + 1 weeks;
    }
    function someFunction() external view returns (bool) {
        return someState;
    }

    function toggleState() external onlyOwner {
        someState = !someState;
        emit ValueChanged(msg.sender, someState);
    }

    function withdraw() external onlyOwner {
        require(block.timestamp >= unlockTime, "Too early");
        emit Withdrawn(msg.sender, address(this).balance);
        payable(owner()).transfer(address(this).balance);
    }

    receive() external payable {}
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CyasInu is ERC20 {
    uint256 private constant _initial_supply = 1000 * (10**18);

    constructor(address[] memory recipients) ERC20("CyasInu", "CINU") {
        _mint(msg.sender, _initial_supply);

        uint256 amount = _initial_supply / recipients.length;
        for (uint256 i = 0; i < recipients.length; i++) {
            _transfer(msg.sender, recipients[i], amount);
        }
    }
}
